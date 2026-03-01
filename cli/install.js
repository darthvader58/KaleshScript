#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const platform = process.platform;
const arch = process.arch;

// GitHub release URL
const GITHUB_REPO = 'darthvader58/kaleshscript';
const VERSION = require('../package.json').version;

// Determine binary name and download URL
let binaryName = 'kaleshscript';
let downloadUrl = '';

if (platform === 'darwin') {
  if (arch === 'arm64') {
    binaryName = 'kaleshscript-darwin-arm64';
  } else {
    binaryName = 'kaleshscript-darwin-amd64';
  }
} else if (platform === 'linux') {
  if (arch === 'arm64') {
    binaryName = 'kaleshscript-linux-arm64';
  } else {
    binaryName = 'kaleshscript-linux-amd64';
  }
} else if (platform === 'win32') {
  binaryName = 'kaleshscript-windows-amd64.exe';
} else {
  console.error(`Unsupported platform: ${platform}-${arch}`);
  console.error('Please build from source: https://github.com/darthvader58/kaleshscript');
  process.exit(1);
}

downloadUrl = `https://github.com/${GITHUB_REPO}/releases/download/v${VERSION}/${binaryName}`;

const binDir = path.join(__dirname, '..', 'bin');
const outputName = platform === 'win32' ? 'kaleshscript.exe' : 'kaleshscript';
const outputPath = path.join(binDir, outputName);

// Create bin directory if it doesn't exist
if (!fs.existsSync(binDir)) {
  fs.mkdirSync(binDir, { recursive: true });
}

console.log('Installing KaleshScript...');
console.log(`Platform: ${platform}-${arch}`);
console.log(`Downloading from: ${downloadUrl}`);

// For now, copy the local binary if it exists
const localBinary = path.join(__dirname, '..', 'kaleshscript');
if (fs.existsSync(localBinary)) {
  console.log('Using local binary...');
  fs.copyFileSync(localBinary, outputPath);
  fs.chmodSync(outputPath, 0o755);
  console.log('✓ KaleshScript installed successfully!');
  console.log('\nUsage:');
  console.log('  kaleshscript <file.ks>    Run a KaleshScript file');
  console.log('  kaleshscript              Start REPL mode');
  console.log('  ks <file.ks>              Short alias');
  process.exit(0);
}

// Download from GitHub releases
function downloadBinary(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Follow redirect
        downloadBinary(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

downloadBinary(downloadUrl, outputPath)
  .then(() => {
    // Make binary executable
    if (platform !== 'win32') {
      fs.chmodSync(outputPath, 0o755);
    }
    console.log('✓ KaleshScript installed successfully!');
    console.log('\nUsage:');
    console.log('  kaleshscript <file.ks>    Run a KaleshScript file');
    console.log('  kaleshscript              Start REPL mode');
    console.log('  ks <file.ks>              Short alias');
  })
  .catch((err) => {
    console.error('Failed to download KaleshScript binary:', err.message);
    console.error('\nPlease build from source:');
    console.error('  git clone https://github.com/darthvader58/kaleshscript');
    console.error('  cd kaleshscript');
    console.error('  go build -o kaleshscript');
    process.exit(1);
  });
