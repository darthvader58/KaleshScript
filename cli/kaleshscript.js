#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Determine the binary path based on platform
const platform = process.platform;
const arch = process.arch;

let binaryName = 'kaleshscript';
if (platform === 'win32') {
  binaryName = 'kaleshscript.exe';
}

const binaryPath = path.join(__dirname, '..', 'bin', binaryName);

// Check if binary exists
if (!fs.existsSync(binaryPath)) {
  console.error('Error: KaleshScript binary not found.');
  console.error('Please run: npm install kaleshscript');
  process.exit(1);
}

// Make sure binary is executable (Unix-like systems)
if (platform !== 'win32') {
  try {
    fs.chmodSync(binaryPath, 0o755);
  } catch (err) {
    // Ignore errors
  }
}

// Pass all arguments to the Go binary
const args = process.argv.slice(2);
const child = spawn(binaryPath, args, {
  stdio: 'inherit',
  shell: false
});

child.on('exit', (code) => {
  process.exit(code || 0);
});

child.on('error', (err) => {
  console.error('Error running KaleshScript:', err.message);
  process.exit(1);
});
