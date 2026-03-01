export interface Example {
  id: string;
  title: string;
  description: string;
  code: string;
}

export const examples: Example[] = [
  {
    id: 'hello',
    title: 'Hello World',
    description: 'Your first KaleshScript program',
    code: `// Hello World in KaleshScript
bhauk "Hello from Delhi!"
bhauk "Welcome to KaleshScript!"

nikal lawde`,
  },
  {
    id: 'variables',
    title: 'Variables',
    description: 'Declare and use variables',
    code: `// Variable declaration
chutiye ye naam hai "Rahul"
chutiye ye age hai 25
chutiye ye city hai "Delhi"

bhauk naam
bhauk age
bhauk city

nikal lawde`,
  },
  {
    id: 'arithmetic',
    title: 'Arithmetic',
    description: 'Basic math operations',
    code: `// Arithmetic operations
chutiye ye a hai 10
chutiye ye b hai 5

chutiye ye sum hai a + b
chutiye ye diff hai a - b
chutiye ye prod hai a * b
chutiye ye quot hai a / b

bhauk "Sum:"
bhauk sum
bhauk "Difference:"
bhauk diff
bhauk "Product:"
bhauk prod
bhauk "Quotient:"
bhauk quot

nikal lawde`,
  },
  {
    id: 'type-error',
    title: 'Type Error Example',
    description: 'What happens with wrong types',
    code: `// This will cause a type error!
chutiye ye a hai sahi
chutiye ye b hai "lund"

// Cannot subtract string from boolean
chutiye ye diff hai a - b

bhauk diff

nikal lawde`,
  },
  {
    id: 'booleans',
    title: 'Booleans',
    description: 'Working with sahi and bekaar',
    code: `// Boolean values
chutiye ye truth hai sahi
chutiye ye lie hai bekaar

bhauk truth
bhauk lie

bsdk agar truth kar: bhauk "Truth is sahi!"
bsdk agar lie kar: bhauk "Won't print"

nikal lawde`,
  },
  {
    id: 'conditionals',
    title: 'If-Else',
    description: 'Conditional statements',
    code: `// If-else statements
chutiye ye score hai 85

bsdk agar score > 90 kar: bhauk "Grade: A+"
bsdk agar score > 80 kar: bhauk "Grade: A"
bsdk agar score > 70 kar: bhauk "Grade: B"

chutiye ye temp hai 45
bsdk agar temp > 40 kar: bhauk "Garmi bahut hai bc!"

nikal lawde`,
  },
  {
    id: 'loops',
    title: 'Loops',
    description: 'Jab tak maa na maane',
    code: `// Loop example
chutiye ye count hai 0

jab tak maa count < 5 na maane: count = count + 1

bhauk "Final count:"
bhauk count

// Loop with print
chutiye ye i hai 0
jab tak maa i < 3 na maane: i = i + 1

nikal lawde`,
  },
  {
    id: 'infinite-loop',
    title: 'Infinite Loop Error',
    description: 'What happens with infinite loops',
    code: `// This will cause an error!
// Infinite loop: jab tak maa sahi na maane

chutiye ye x hai 0

// This condition is always true (sahi = true)
// So it will run forever and throw an error
jab tak maa sahi na maane: x = x + 1

nikal lawde`,
  },
  {
    id: 'break-continue',
    title: 'Break & Continue',
    description: 'Loop control statements',
    code: `// Break example
chutiye ye x hai 0
jab tak maa x < 10 na maane: x = x + 1

// Continue example  
chutiye ye y hai 0
jab tak maa y < 5 na maane: y = y + 1

bhauk "Loops completed!"

nikal lawde`,
  },
  {
    id: 'switch',
    title: 'Switch Case',
    description: 'Mood dekh statement',
    code: `// Switch case
chutiye ye mood hai "happy"

mood mood {
    dekh "happy": bhauk "Party karte hain!"
    dekh "sad": bhauk "Daaru lao yaar"
    default: bhauk "Chill maar"
}

nikal lawde`,
  },
  {
    id: 'functions',
    title: 'Functions',
    description: 'Kaand (function) definitions',
    code: `// Function definition
kaand greet(naam) {
    bhauk "Hello"
    bhauk naam
}

// Call function
greet("Rahul")
greet("Delhi")

nikal lawde`,
  },
  {
    id: 'try-catch',
    title: 'Try-Catch',
    description: 'Error handling',
    code: `// Try-catch example
try kar: bhauk "Trying something..." , pakad mc: bhauk "Error handled!"

bhauk "Program continues!"

nikal lawde`,
  },
  {
    id: 'arrays',
    title: 'Arrays',
    description: 'Working with arrays',
    code: `// Arrays
chutiye ye numbers hai [10, 20, 30, 40, 50]

bhauk "First element:"
bhauk numbers[0]

bhauk "Third element:"
bhauk numbers[2]

bhauk "Last element:"
bhauk numbers[4]

nikal lawde`,
  },
  {
    id: 'strings',
    title: 'Strings',
    description: 'String operations',
    code: `// String concatenation
chutiye ye first hai "Delhi"
chutiye ye second hai " Rocks"
chutiye ye combined hai first + second

bhauk combined

chutiye ye greeting hai "Namaste"
bhauk greeting

nikal lawde`,
  },
  {
    id: 'hash',
    title: 'Hash/Dictionary',
    description: 'Key-value pairs',
    code: `// Hash/Dictionary
chutiye ye person hai {"name": "Rahul", "age": 25, "city": "Delhi"}

bhauk "Name:"
bhauk person["name"]

bhauk "City:"
bhauk person["city"]

chutiye ye food hai {"best": "Chole Bhature", "drink": "Lassi"}
bhauk food["best"]

nikal lawde`,
  },
  {
    id: 'exit',
    title: 'Exit Program',
    description: 'Nikal lawde statement',
    code: `// Exit program - REQUIRED to end every program
bhauk "Starting program..."
bhauk "Line 1"
bhauk "Line 2"

nikal lawde

bhauk "This won't print"
bhauk "Program exited above"`,
  },
  {
    id: 'delhi-vibes',
    title: 'Delhi Vibes',
    description: 'Pure Delhi style code',
    code: `// Delhi Vibes
bhauk "Arre bhai, KaleshScript mein code!"
bhauk ""

chutiye ye temp hai 45
bhauk "Delhi ka temperature:"
bhauk temp

bsdk agar temp > 40 kar: bhauk "Garmi bahut hai bc!"

chutiye ye stations hai ["Rajiv Chowk", "Kashmere Gate", "Chandni Chowk"]
bhauk "Favourite metro station:"
bhauk stations[0]

chutiye ye dilli_facts hai {"food": "Chole Bhature", "transport": "Metro"}
bhauk "Best food:"
bhauk dilli_facts["food"]

bhauk ""
bhauk "Code khatam! Milte hain!"

nikal lawde`,
  },
];
