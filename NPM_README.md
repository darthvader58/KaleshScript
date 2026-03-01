# KaleshScript

**Dilli ki apni coding language!** 

A fun programming language only for entertainment purpose.

## Installation

Install globally via npm:

```bash
npm install -g kaleshscript
```

Or use npx to run without installing:

```bash
npx kaleshscript hello.ks
```

## Usage

### Run a file

```bash
kaleshscript hello.ks
# or use the short alias
ks hello.ks
```

### Start REPL

```bash
kaleshscript
```

## Quick Example

Create a file `hello.ks`:

```kaleshscript
// Hello World in KaleshScript
bhauk "Hello from Delhi!"
bhauk "Welcome to KaleshScript!"

nikal lawde
```

Run it:

```bash
kaleshscript hello.ks
```

## Language Features

- **Variables**: `chutiye ye x hai 42`
- **Print**: `bhauk "Hello"`
- **If-Else**: `bsdk agar x > 10 kar: bhauk "Big"`
- **Loops**: `jab tak maa condition na maane: statement`
- **Functions**: `kaand greet(naam) { bhauk naam }`
- **Arrays**: `[1, 2, 3]`
- **Hashes**: `{"key": "value"}`
- **Input**: `Suna lawde()`
- **Exit**: `nikal lawde` (required!)

## More Examples

Try the online playground: [kaleshscript.vercel.app](https://kaleshscript.vercel.app)

## Documentation

Full documentation available at: [kaleshscript.vercel.app/paddhai](https://kaleshscript.vercel.app/paddhai)

## Repository

GitHub: [github.com/darthvader58/kaleshscript](https://github.com/darthvader58/kaleshscript)

## License

MIT

---

# Publishing to npm (For Maintainers)

## Prerequisites

1. Create an npm account at https://www.npmjs.com/signup
2. Login to npm: `npm login`

## Steps to Publish

### 1. Prepare the package

Make sure you have:
- Built the Go binary: `go build -o kaleshscript`
- Copied binary to bin: `cp kaleshscript bin/kaleshscript`
- Updated version in `package.json` if needed

### 2. Test locally

```bash
# Test installation
node cli/install.js

# Test CLI
node cli/kaleshscript.js examples/boolean_demo.ks

# Test with npm link (optional)
npm link
kaleshscript examples/boolean_demo.ks
npm unlink kaleshscript
```

### 3. Publish to npm

```bash
# Dry run to see what will be published
npm publish --dry-run

# Publish for real
npm publish
```

### 4. Test the published package

```bash
# Install globally
npm install -g kaleshscript

# Test it
kaleshscript examples/boolean_demo.ks

# Or use the short alias
ks examples/boolean_demo.ks

# Start REPL
kaleshscript
```

## For Future Releases

### Create GitHub Releases with Binaries

For the install script to download binaries from GitHub releases:

1. Build for multiple platforms:
```bash
# macOS ARM64
GOOS=darwin GOARCH=arm64 go build -o kaleshscript-darwin-arm64

# macOS AMD64
GOOS=darwin GOARCH=amd64 go build -o kaleshscript-darwin-amd64

# Linux ARM64
GOOS=linux GOARCH=arm64 go build -o kaleshscript-linux-arm64

# Linux AMD64
GOOS=linux GOARCH=amd64 go build -o kaleshscript-linux-amd64

# Windows AMD64
GOOS=windows GOARCH=amd64 go build -o kaleshscript-windows-amd64.exe
```

2. Create a GitHub release with tag `v1.0.0`
3. Upload all binaries to the release
4. Update version in `package.json`
5. Publish to npm

## Update Version

```bash
# Patch version (1.0.0 -> 1.0.1)
npm version patch

# Minor version (1.0.0 -> 1.1.0)
npm version minor

# Major version (1.0.0 -> 2.0.0)
npm version major

# Then publish
npm publish
```

## Unpublish (if needed)

```bash
# Unpublish a specific version (within 72 hours)
npm unpublish kaleshscript@1.0.0

# Unpublish entire package (use with caution!)
npm unpublish kaleshscript --force
```

## Notes

- The package includes the Go binary for the current platform
- Users on other platforms will need to build from source or wait for GitHub releases
- The install script will try to download from GitHub releases first, then fall back to local binary
- Make sure to test on different platforms before publishing

---

Tere baap ne pyaar se banayi hai &lt;333
