# KaleshScript Web Compiler - All Features Test

## Features Implemented

### 1. Variables ✓
```kaleshscript
chutiye ye x hai 42
chutiye ye naam hai "Rahul"
```

### 2. Print ✓
```kaleshscript
bhauk "Hello"
bhauk x
```

### 3. Booleans ✓
```kaleshscript
chutiye ye truth hai sahi
chutiye ye lie hai bekaar
```

### 4. If-Else ✓
```kaleshscript
bsdk agar x > 10 kar: bhauk "Big"
bsdk agar x > 10 kar: bhauk "Big" warna: bhauk "Small"
```

### 5. Loops ✓
```kaleshscript
chutiye ye i hai 0
jab tak maa i < 5 na maane: i = i + 1
```

### 6. Break ✓
```kaleshscript
ruk jaa bc
```

### 7. Continue ✓
```kaleshscript
aage baddh bc
```

### 8. Switch Case ✓
```kaleshscript
mood value {
    case "happy": bhauk "Party!"
    case "sad": bhauk "Sad"
    default: bhauk "Default"
}
```

### 9. Functions ✓
```kaleshscript
kaand greet(naam) {
    bhauk naam
}
greet("Rahul")
```

### 10. Try-Catch ✓
```kaleshscript
try kar: bhauk "Try" , pakad mc: bhauk "Catch"
```

### 11. Input ✓
```kaleshscript
chutiye ye naam hai Suna lawde()
```

### 12. Exit ✓
```kaleshscript
nikal lawde
```

### 13. Arrays ✓
```kaleshscript
chutiye ye arr hai [1, 2, 3]
bhauk arr[0]
```

### 14. Hash/Dictionary ✓
```kaleshscript
chutiye ye person hai {"name": "Rahul"}
bhauk person["name"]
```

### 15. Arithmetic ✓
```kaleshscript
chutiye ye sum hai 10 + 5
chutiye ye diff hai 10 - 5
chutiye ye prod hai 10 * 5
chutiye ye quot hai 10 / 5
```

### 16. Comparisons ✓
```kaleshscript
bsdk agar x > 10 kar: bhauk "Greater"
bsdk agar x < 10 kar: bhauk "Less"
bsdk agar x == 10 kar: bhauk "Equal"
bsdk agar x != 10 kar: bhauk "Not equal"
```

### 17. Comments ✓
```kaleshscript
// This is a comment
```

## All Features from Original Specification

From the first prompt:
- ✓ Variable Declaration: `chutiye ye hai`
- ✓ If-Else: `bsdk agar {condition} kar : statement , warna : statement`
- ✓ Input: `Suna lawde()`
- ✓ Print: `bhauk bc`
- ✓ Function: `kaand (parameters){....}`
- ✓ Boolean Values: `sahi`, `bekaar`
- ✓ Switch Case: `mood dekh { case ... default ... }`
- ✓ Exit: `nikal lawde`
- ✓ Loop: `jab tak maa (condition) na maane : statement`
- ✓ Break: `ruk jaa bc`
- ✓ Continue: `aage baddh bc`
- ✓ Try-catch: `try kar : statement , pakad mc : statement`

## Error Messages
- Syntax Error: "Ye kya bakchodi likh di?"
- Type Error: "Dimag use kar thoda"
- Runtime Error: "Lafda ho gaya"
- Null Pointer: "Khali dimaag"
