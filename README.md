# KaleshScript 🔥

**Delhi ki apni coding language!** Built with pure Delhi slang, memes, and street swagger energy.

## What is KaleshScript?

KaleshScript is a fun programming language that brings Delhi's iconic street language to code. It's built in Go and features all the essential programming constructs with a Delhi twist.

## Quick Start

```bash
# Build
go build -o kaleshscript

# Run the comprehensive demo
./kaleshscript examples/comprehensive.ks

# Try the REPL
./kaleshscript
>> chutiye ye x hai 42
>> bhauk x
42
>> nikal lawde
```

## Language Syntax

### Variable Declaration
```kaleshscript
chutiye ye x hai 42
chutiye ye naam hai "Rahul"
chutiye ye status hai sahi
```

### Boolean Values
- `sahi` - true
- `bekaar` - false

### Print Statement
```kaleshscript
bhauk "Hello Delhi!"
bhauk x
```

### Input
```kaleshscript
chutiye ye input hai Suna lawde()
bhauk input
```

### If-Else
```kaleshscript
bsdk agar x > 10 kar: bhauk "X bada hai"

bsdk agar x > 10 kar: bhauk "X bada hai" warna: bhauk "X chota hai"
```

Note: Currently supports single-statement blocks after colons.

### Loops
```kaleshscript
chutiye ye i hai 0
jab tak maa i < 5 na maane: i = i + 1
```

Note: Currently supports single-statement loop bodies.

### Break and Continue
```kaleshscript
// Note: break and continue work within loops
ruk jaa bc    // break
aage baddh bc // continue
```

### Switch Case
```kaleshscript
mood dekh {
    case "happy":
        bhauk "Party karte hain!"
    case "sad":
        bhauk "Daaru lao yaar"
    default:
        bhauk "Therapy le bhai"
}
```

### Functions
```kaleshscript
kaand greet(naam) {
    bhauk "Hello " + naam
}

greet("Bhai")
```

### Arrays
```kaleshscript
chutiye ye numbers hai [1, 2, 3, 4, 5]
bhauk numbers[0]
bhauk numbers[2]
```

### Hash/Dictionary
```kaleshscript
chutiye ye person hai {"name": "Rahul", "age": 25}
bhauk person["name"]
bhauk person["age"]
```

### Try-Catch
```kaleshscript
try kar:
    bhauk "Risky code here"
, pakad mc:
    bhauk "Error handle kar liya"
```

### Classes (OOP)
```kaleshscript
gang Person {
    kaand init(naam) {
        bhauk "Person bana: " + naam
    }
    
    kaand greet() {
        bhauk "Namaste!"
    }
}

chutiye ye p hai naya Person("Rahul")
```

### Exit Program
```kaleshscript
nikal lawde
```

## Error Messages

KaleshScript has its own style of error messages:

- **Syntax Error**: `Ye kya bakchodi likh di?`
- **Type Error**: `Dimag use kar thoda`
- **Runtime Error**: `Lafda ho gaya`
- **Null Pointer**: `Khali dimaag`

## Operators

- Arithmetic: `+`, `-`, `*`, `/`
- Comparison: `==`, `!=`, `<`, `>`
- Assignment: `=`

## Data Types

- Integers: `42`, `100`
- Strings: `"Hello"`, `"Delhi"`
- Booleans: `sahi`, `bekaar`
- Arrays: `[1, 2, 3]`
- Hashes: `{"key": "value"}`
- Null: `khali dimaag`

## Examples

Check out the `examples/` directory for sample programs:

- `comprehensive.ks` - Full feature showcase
- `final_demo.ks` - Quick demo
- `boolean_demo.ks` - Boolean operations
- `loop_test.ks` - Loop examples

Run any example:
```bash
./kaleshscript examples/comprehensive.ks
```

## REPL

Start the interactive REPL by running:

```bash
./kaleshscript
```

Type `nikal lawde` to exit the REPL.

## Building from Source

```bash
go build -o kaleshscript
```

## Contributing

Feel free to add more Delhi slang and features! This is meant to be fun and educational.

## License

MIT License - Have fun with it!

---

**Disclaimer**: This is a fun educational project. The language uses Delhi street slang for entertainment purposes. No offense intended! 🙏
