import FeedbackForm from './FeedbackForm';

export default function Documentation() {
  return (
    <div className="bg-dark-surface max-w-5xl mx-auto my-8 rounded-xl shadow-xl border border-dark-border overflow-hidden">
      {/* Header */}
      <div className="bg-neon-yellow p-6">
        <h1 className="text-3xl font-bold text-dark-bg">KaleshScript Documentation</h1>
        <p className="text-dark-bg/80 mt-2">Aagye nikamme? Achhe se paddh and phir code kar.</p>
      </div>
      
      <div className="p-8 space-y-12">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-text-primary flex items-center">
            <div className="w-1 h-7 bg-neon-yellow rounded-full mr-3"></div>
            What is KaleshScript?
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            KaleshScript is a fun, toy programming language that brings Delhi's slang language to code. 
            It's built for entertainment and certainly NO LEARNING purposes, featuring everything that kids should not learn. Don't cancel me. Read, code and laugh!
          </p>
        </section>

        {/* Quick Start */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-text-primary flex items-center">
            <div className="w-1 h-7 bg-neon-yellow rounded-full mr-3"></div>
            Quick Start
          </h2>
          <p className="text-text-secondary mb-4">Here's your first KaleshScript program:</p>
          <pre className="bg-dark-bg text-text-primary p-4 rounded-lg overflow-x-auto border border-dark-border font-mono text-sm">
{`bhauk "Hello from Delhi!"
nikal lawde`}
          </pre>
          <p className="text-text-tertiary text-sm mt-2">
            That's it! <code className="bg-dark-elevated px-2 py-1 rounded text-xs">bhauk</code> prints output, 
            and <code className="bg-dark-elevated px-2 py-1 rounded text-xs">nikal lawde</code> exits the program.
          </p>
        </section>

        {/* Language Syntax */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-text-primary flex items-center">
            <div className="w-1 h-7 bg-neon-yellow rounded-full mr-3"></div>
            Language Syntax
          </h2>
          
          <div className="space-y-10">
            {/* Variables */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-neon-yellow">1. Variable Declaration</h3>
              <p className="text-text-secondary mb-3">
                Declare variables using <code className="bg-dark-elevated px-2 py-1 rounded text-sm">chutiye ye</code> followed by variable name, 
                <code className="bg-dark-elevated px-2 py-1 rounded text-sm">hai</code>, and the value.
              </p>
              <pre className="bg-dark-bg text-text-primary p-4 rounded-lg overflow-x-auto border border-dark-border font-mono text-sm">
{`chutiye ye x hai 42
chutiye ye naam hai "Rahul"
chutiye ye status hai sahi
chutiye ye price hai 99.99`}
              </pre>
              <div className="mt-3 text-sm text-text-tertiary">
                <p>Variables can hold:</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Numbers (integers and decimals)</li>
                  <li>Strings (text in quotes)</li>
                  <li>Booleans (sahi/bekaar)</li>
                  <li>Arrays and Hashes</li>
                </ul>
              </div>
            </div>

            {/* Booleans */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-neon-yellow">2. Boolean Values</h3>
              <p className="text-text-secondary mb-3">
                KaleshScript has its own boolean values with Delhi flavor:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2 mb-3">
                <li><code className="bg-dark-elevated px-3 py-1 rounded text-sm text-neon-yellow">sahi</code> - means true (correct/right)</li>
                <li><code className="bg-dark-elevated px-3 py-1 rounded text-sm text-neon-yellow">bekaar</code> - means false (useless/wrong)</li>
              </ul>
              <pre className="bg-dark-bg text-text-primary p-4 rounded-lg overflow-x-auto border border-dark-border font-mono text-sm">
{`chutiye ye truth hai sahi
chutiye ye lie hai bekaar

bhauk truth    // Prints: sahi
bhauk lie      // Prints: bekaar`}
              </pre>
            </div>

            {/* Print */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-neon-yellow">3. Print Statement</h3>
              <p className="text-text-secondary mb-3">
                Use <code className="bg-dark-elevated px-2 py-1 rounded text-sm">bhauk</code> (bark) to print output to console:
              </p>
              <pre className="bg-dark-bg text-text-primary p-4 rounded-lg overflow-x-auto border border-dark-border font-mono text-sm">
{`bhauk "Hello Delhi!"
bhauk 42
bhauk x
bhauk "Score: " + score`}
              </pre>
            </div>

            {/* Arithmetic */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-neon-yellow">4. Arithmetic Operations</h3>
              <p className="text-text-secondary mb-3">
                Standard arithmetic operators work as expected:
              </p>
              <pre className="bg-dark-bg text-text-primary p-4 rounded-lg overflow-x-auto border border-dark-border font-mono text-sm">
{`chutiye ye a hai 10
chutiye ye b hai 5

chutiye ye sum hai a + b      // 15
chutiye ye diff hai a - b     // 5
chutiye ye prod hai a * b     // 50
chutiye ye quot hai a / b     // 2

bhauk sum`}
              </pre>
              <div className="mt-3 p-3">
                <p className="text-sm text-text-secondary">
                  <strong className="text-neon-orange">Type Safety:</strong> Arithmetic operations require numbers. 
                  Trying to subtract a string from a boolean will throw: "Dimag use kar thoda: Cannot subtract string from boolean"
                </p>
              </div>
            </div>

            {/* Comparison */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-neon-yellow">5. Comparison Operators</h3>
              <p className="text-text-secondary mb-3">
                Compare values using standard operators:
              </p>
              <pre className="bg-dark-bg text-text-primary p-4 rounded-lg overflow-x-auto border border-dark-border font-mono text-sm">
{`chutiye ye x hai 10
chutiye ye y hai 20

bhauk x == y    // bekaar (false)
bhauk x != y    // sahi (true)
bhauk x < y     // sahi (true)
bhauk x > y     // bekaar (false)`}
              </pre>
              <p className="text-text-tertiary text-sm mt-2">
                Available operators: <code className="bg-dark-elevated px-2 py-1 rounded text-xs">==</code>, 
                <code className="bg-dark-elevated px-2 py-1 rounded text-xs">!=</code>, 
                <code className="bg-dark-elevated px-2 py-1 rounded text-xs">&lt;</code>, 
                <code className="bg-dark-elevated px-2 py-1 rounded text-xs">&gt;</code>
              </p>
            </div>

            {/* If-Else */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-neon-yellow">6. If-Else Statements</h3>
              <p className="text-text-secondary mb-3">
                Conditional logic using <code className="bg-dark-elevated px-2 py-1 rounded text-sm">bsdk agar</code> (if) 
                and <code className="bg-dark-elevated px-2 py-1 rounded text-sm">warna</code> (else):
              </p>
              <pre className="bg-dark-bg text-text-primary p-4 rounded-lg overflow-x-auto border border-dark-border font-mono text-sm">
{`// Simple if
bsdk agar x > 10 kar: bhauk "X is big"

// If with else
bsdk agar score > 90 kar: bhauk "Grade A" warna: bhauk "Grade B"

// Multiple conditions
chutiye ye temp hai 45
bsdk agar temp > 40 kar: bhauk "Too hot!"
bsdk agar temp < 10 kar: bhauk "Too cold!"
bsdk agar temp == 25 kar: bhauk "Perfect!"`}
              </pre>
              <p className="text-text-tertiary text-sm mt-2">
                Syntax: <code className="bg-dark-elevated px-2 py-1 rounded text-xs">bsdk agar [condition] kar: [statement]</code>
              </p>
            </div>

            {/* Loops */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-neon-yellow">7. Loops</h3>
              <p className="text-text-secondary mb-3">
                Use <code className="bg-dark-elevated px-2 py-1 rounded text-sm">jab tak maa [condition] na maane</code> 
                (while mother doesn't agree) for loops:
              </p>
              <pre className="bg-dark-bg text-text-primary p-4 rounded-lg overflow-x-auto border border-dark-border font-mono text-sm">
{`// Count from 0 to 5
chutiye ye count hai 0
jab tak maa count < 5 na maane: count = count + 1

bhauk count  // Prints: 5

// Loop with multiple statements
chutiye ye i hai 0
jab tak maa i < 3 na maane: i = i + 1`}
              </pre>
              <div className="mt-3 p-3">
                <p className="text-sm text-text-secondary">
                  <strong className="text-neon-orange">Infinite Loop Protection:</strong> Loops are limited to 10,000 iterations. 
                  If exceeded, you'll get: "Lafda ho gaya: Infinite loop detected!"
                </p>
              </div>
              <pre className="bg-dark-bg text-text-primary p-4 rounded-lg overflow-x-auto border border-dark-border font-mono text-sm mt-3">
{`// This will error after 10,000 iterations
jab tak maa sahi na maane: x = x + 1`}
              </pre>
            </div>

            {/* Break & Continue */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-neon-yellow">8. Break & Continue</h3>
              <p className="text-text-secondary mb-3">
                Control loop execution with break and continue statements:
              </p>
              <ul className="list-disc list-inside text-text-secondary space-y-2 mb-3">
                <li><code className="bg-dark-elevated px-3 py-1 rounded text-sm text-neon-yellow">ruk jaa bc</code> - break (stop the loop)</li>
                <li><code className="bg-dark-elevated px-3 py-1 rounded text-sm text-neon-yellow">aage baddh bc</code> - continue (skip to next iteration)</li>
              </ul>
              <pre className="bg-dark-bg text-text-primary p-4 rounded-lg overflow-x-auto border border-dark-border font-mono text-sm">
{`// Break example
chutiye ye x hai 0
jab tak maa x < 10 na maane: x = x + 1

// Continue example
chutiye ye y hai 0
jab tak maa y < 5 na maane: y = y + 1`}
              </pre>
            </div>

            {/* Switch Case */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-neon-yellow">9. Switch Case</h3>
              <p className="text-text-secondary mb-3">
                Use <code className="bg-dark-elevated px-2 py-1 rounded text-sm">mood</code> for switch statements 
                and <code className="bg-dark-elevated px-2 py-1 rounded text-sm">dekh</code> for each case:
              </p>
              <pre className="bg-dark-bg text-text-primary p-4 rounded-lg overflow-x-auto border border-dark-border font-mono text-sm">
{`chutiye ye mood hai "happy"

mood mood {
    dekh "happy": bhauk "Party karte hain!"
    dekh "sad": bhauk "Daaru lao yaar"
    dekh "angry": bhauk "Chill maar bhai"
    default: bhauk "Sab theek hai"
}

// Works with numbers too
chutiye ye day hai 1

mood day {
    dekh 1: bhauk "Monday"
    dekh 2: bhauk "Tuesday"
    default: bhauk "Other day"
}`}
              </pre>
              <p className="text-text-tertiary text-sm mt-2">
                Syntax: <code className="bg-dark-elevated px-2 py-1 rounded text-xs">mood [variable] {"{ dekh [value]: [statement] }"}</code>
              </p>
            </div>

            {/* Functions */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-neon-yellow">10. Functions</h3>
              <p className="text-text-secondary mb-3">
                Define functions using <code className="bg-dark-elevated px-2 py-1 rounded text-sm">kaand</code> (mischief/function):
              </p>
              <pre className="bg-dark-bg text-text-primary p-4 rounded-lg overflow-x-auto border border-dark-border font-mono text-sm">
{`// Function with parameter
kaand greet(naam) {
    bhauk "Hello"
    bhauk naam
}

// Call the function
greet("Rahul")
greet("Delhi")

// Function with multiple parameters
kaand add(a, b) {
    chutiye ye sum hai a + b
    bhauk sum
}

add(10, 20)  // Prints: 30`}
              </pre>
              <p className="text-text-tertiary text-sm mt-2">
                Syntax: <code className="bg-dark-elevated px-2 py-1 rounded text-xs">kaand [name]([params]) {"{ [body] }"}</code>
              </p>
            </div>

            {/* Try-Catch */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-neon-yellow">11. Try-Catch</h3>
              <p className="text-text-secondary mb-3">
                Handle errors using <code className="bg-dark-elevated px-2 py-1 rounded text-sm">try kar</code> (try) 
                and <code className="bg-dark-elevated px-2 py-1 rounded text-sm">pakad mc</code> (catch):
              </p>
              <pre className="bg-dark-bg text-text-primary p-4 rounded-lg overflow-x-auto border border-dark-border font-mono text-sm">
{`// Try-catch example
try kar: bhauk "Risky operation" , pakad mc: bhauk "Error handled!"

// Program continues after error
bhauk "Still running!"`}
              </pre>
              <p className="text-text-tertiary text-sm mt-2">
                Syntax: <code className="bg-dark-elevated px-2 py-1 rounded text-xs">try kar: [statement] , pakad mc: [error handler]</code>
              </p>
            </div>

            {/* Arrays */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-neon-yellow">12. Arrays</h3>
              <p className="text-text-secondary mb-3">
                Create and access arrays (lists) of values:
              </p>
              <pre className="bg-dark-bg text-text-primary p-4 rounded-lg overflow-x-auto border border-dark-border font-mono text-sm">
{`// Create an array
chutiye ye numbers hai [10, 20, 30, 40, 50]

// Access elements (0-indexed)
bhauk numbers[0]    // First element: 10
bhauk numbers[2]    // Third element: 30
bhauk numbers[4]    // Last element: 50

// Array of strings
chutiye ye cities hai ["Delhi", "Mumbai", "Bangalore"]
bhauk cities[0]     // Delhi

// Mixed types
chutiye ye mixed hai [42, "text", sahi]`}
              </pre>
              <p className="text-text-tertiary text-sm mt-2">
                Arrays are zero-indexed. First element is at index 0.
              </p>
            </div>

            {/* Hashes */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-neon-yellow">13. Hash/Dictionary</h3>
              <p className="text-text-secondary mb-3">
                Store key-value pairs using hash/dictionary syntax:
              </p>
              <pre className="bg-dark-bg text-text-primary p-4 rounded-lg overflow-x-auto border border-dark-border font-mono text-sm">
{`// Create a hash
chutiye ye person hai {"name": "Rahul", "age": 25, "city": "Delhi"}

// Access values by key
bhauk person["name"]    // Rahul
bhauk person["age"]     // 25
bhauk person["city"]    // Delhi

// Nested hash
chutiye ye data hai {
    "user": "admin",
    "settings": {"theme": "dark", "lang": "hi"}
}

bhauk data["user"]`}
              </pre>
              <p className="text-text-tertiary text-sm mt-2">
                Keys must be strings in quotes. Values can be any type.
              </p>
            </div>

            {/* Strings */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-neon-yellow">14. String Operations</h3>
              <p className="text-text-secondary mb-3">
                Work with text using string operations:
              </p>
              <pre className="bg-dark-bg text-text-primary p-4 rounded-lg overflow-x-auto border border-dark-border font-mono text-sm">
{`// String concatenation with +
chutiye ye first hai "Delhi"
chutiye ye second hai " Rocks"
chutiye ye combined hai first + second

bhauk combined    // Delhi Rocks

// Strings in quotes
chutiye ye greeting hai "Namaste"
chutiye ye message hai "Welcome to KaleshScript!"`}
              </pre>
            </div>

            {/* Input */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-neon-yellow">15. Input</h3>
              <p className="text-text-secondary mb-3">
                Get user input using <code className="bg-dark-elevated px-2 py-1 rounded text-sm">Suna lawde()</code> (listen up):
              </p>
              <pre className="bg-dark-bg text-text-primary p-4 rounded-lg overflow-x-auto border border-dark-border font-mono text-sm">
{`// Get input from user
chutiye ye naam hai Suna lawde()
bhauk "Your name is:"
bhauk naam

// Use input in calculations
chutiye ye age hai Suna lawde()
bhauk age`}
              </pre>
              <p className="text-text-tertiary text-sm mt-2">
                In the web version, this will prompt for input via browser prompt dialog.
              </p>
              <pre className="bg-dark-bg text-text-primary p-4 rounded-lg overflow-x-auto border border-dark-border font-mono text-sm mt-3">
{`// Complete input example
bhauk "What's your name?"
chutiye ye naam hai Suna lawde()

bhauk "Hello"
bhauk naam

bhauk "How old are you?"
chutiye ye age hai Suna lawde()

bhauk "You are"
bhauk age
bhauk "years old"

nikal lawde`}
              </pre>
            </div>

            {/* Exit */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-neon-yellow">16. Exit Program (REQUIRED)</h3>
              <div className="bg-dark-elevated p-4 rounded-lg border-l-4 border-red-600">
              <h3 className="text-lg font-bold text-red-600 mb-2">IMPORTANT Rule</h3>
                <p className="text-text-primary">
                    Every KaleshScript program MUST end with <code className="bg-dark-elevated px-2 py-1 rounded text-neon-yellow">nikal lawde</code>. 
                    Without this statement, your program will throw an error and refuse to run.
                </p>
              </div>
              <p className="text-text-secondary mb-3">
                <br></br>Use <code className="bg-dark-elevated px-2 py-1 rounded text-sm">nikal lawde</code> (get out) to exit the program. 
                This is MANDATORY - programs without it will not run!
              </p>
              <pre className="bg-dark-bg text-text-primary p-4 rounded-lg overflow-x-auto border border-dark-border font-mono text-sm">
{`bhauk "Starting program..."
bhauk "Doing some work..."
bhauk "Almost done..."

nikal lawde  // REQUIRED to end program

// Code after this won't execute
bhauk "This won't print"`}
              </pre>
              <p className="text-text-tertiary text-sm mt-2">
                Think of it as the program saying "I'm done, getting out of here!"
              </p>
            </div>

            {/* Comments */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-neon-yellow">17. Comments</h3>
              <p className="text-text-secondary mb-3">
                Add comments to your code using <code className="bg-dark-elevated px-2 py-1 rounded text-sm">//</code>:
              </p>
              <pre className="bg-dark-bg text-text-primary p-4 rounded-lg overflow-x-auto border border-dark-border font-mono text-sm">
{`// This is a comment
// Comments are ignored by the interpreter

chutiye ye x hai 42  // Inline comment

// Use comments to explain your code
// They help others understand what you're doing

nikal lawde`}
              </pre>
            </div>
          </div>
        </section>

        {/* Data Types */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-text-primary flex items-center">
            <div className="w-1 h-7 bg-neon-yellow rounded-full mr-3"></div>
            Data Types
          </h2>
          <div className="space-y-4">
            <div className="bg-dark-elevated p-4 rounded-lg border border-dark-border">
              <h4 className="font-semibold text-text-primary mb-2">Numbers</h4>
              <p className="text-text-secondary text-sm mb-2">Integers and decimals</p>
              <code className="text-neon-yellow text-sm">42, -10, 3.14, 99.99</code>
            </div>
            
            <div className="bg-dark-elevated p-4 rounded-lg border border-dark-border">
              <h4 className="font-semibold text-text-primary mb-2">Strings</h4>
              <p className="text-text-secondary text-sm mb-2">Text enclosed in double quotes</p>
              <code className="text-neon-yellow text-sm">"Hello", "Delhi", "KaleshScript"</code>
            </div>
            
            <div className="bg-dark-elevated p-4 rounded-lg border border-dark-border">
              <h4 className="font-semibold text-text-primary mb-2">Booleans</h4>
              <p className="text-text-secondary text-sm mb-2">True or false values</p>
              <code className="text-neon-yellow text-sm">sahi (true), bekaar (false)</code>
            </div>
            
            <div className="bg-dark-elevated p-4 rounded-lg border border-dark-border">
              <h4 className="font-semibold text-text-primary mb-2">Arrays</h4>
              <p className="text-text-secondary text-sm mb-2">Ordered lists of values</p>
              <code className="text-neon-yellow text-sm">[1, 2, 3], ["a", "b", "c"]</code>
            </div>
            
            <div className="bg-dark-elevated p-4 rounded-lg border border-dark-border">
              <h4 className="font-semibold text-text-primary mb-2">Hashes</h4>
              <p className="text-text-secondary text-sm mb-2">Key-value pairs (dictionaries)</p>
              <code className="text-neon-yellow text-sm">{"{"}"name": "Rahul", "age": 25{"}"}</code>
            </div>
          </div>
        </section>

        {/* Operators */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-text-primary flex items-center">
            <div className="w-1 h-7 bg-neon-yellow rounded-full mr-3"></div>
            Operators
          </h2>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-neon-yellow mb-3">Arithmetic Operators</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-dark-elevated p-3 rounded border border-dark-border">
                  <code className="text-neon-yellow">+</code>
                  <span className="text-text-secondary text-sm ml-2">Addition</span>
                </div>
                <div className="bg-dark-elevated p-3 rounded border border-dark-border">
                  <code className="text-neon-yellow">-</code>
                  <span className="text-text-secondary text-sm ml-2">Subtraction</span>
                </div>
                <div className="bg-dark-elevated p-3 rounded border border-dark-border">
                  <code className="text-neon-yellow">*</code>
                  <span className="text-text-secondary text-sm ml-2">Multiplication</span>
                </div>
                <div className="bg-dark-elevated p-3 rounded border border-dark-border">
                  <code className="text-neon-yellow">/</code>
                  <span className="text-text-secondary text-sm ml-2">Division</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-neon-yellow mb-3">Comparison Operators</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-dark-elevated p-3 rounded border border-dark-border">
                  <code className="text-neon-yellow">==</code>
                  <span className="text-text-secondary text-sm ml-2">Equal to</span>
                </div>
                <div className="bg-dark-elevated p-3 rounded border border-dark-border">
                  <code className="text-neon-yellow">!=</code>
                  <span className="text-text-secondary text-sm ml-2">Not equal to</span>
                </div>
                <div className="bg-dark-elevated p-3 rounded border border-dark-border">
                  <code className="text-neon-yellow">&lt;</code>
                  <span className="text-text-secondary text-sm ml-2">Less than</span>
                </div>
                <div className="bg-dark-elevated p-3 rounded border border-dark-border">
                  <code className="text-neon-yellow">&gt;</code>
                  <span className="text-text-secondary text-sm ml-2">Greater than</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-neon-yellow mb-3">Assignment Operator</h4>
              <div className="bg-dark-elevated p-3 rounded border border-dark-border inline-block">
                <code className="text-neon-yellow">=</code>
                <span className="text-text-secondary text-sm ml-2">Assign value to variable</span>
              </div>
            </div>
          </div>
        </section>

        {/* Error Messages */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-text-primary flex items-center">
            <div className="w-1 h-7 bg-neon-yellow rounded-full mr-3"></div>
            Error Messages (Delhi Style)
          </h2>
          <p className="text-text-secondary mb-4">
            KaleshScript has its own unique error messages with Delhi flavor. Here's what they mean:
          </p>
          
          <div className="space-y-4">
            <div className="bg-dark-elevated p-4 rounded-lg border-l-4 border-red-500">
              <h4 className="font-semibold text-red-400 mb-2">Syntax Error</h4>
              <code className="text-text-primary text-sm block mb-2">"Ye kya bakchodi likh di?"</code>
              <p className="text-text-secondary text-sm">
                Translation: "What nonsense did you write?" - You have a syntax error in your code. 
                Check for missing keywords, wrong punctuation, or typos.
              </p>
            </div>

            <div className="bg-dark-elevated p-4 rounded-lg border-l-4 border-orange-500">
              <h4 className="font-semibold text-orange-400 mb-2">Type Error</h4>
              <code className="text-text-primary text-sm block mb-2">"Dimag use kar thoda"</code>
              <p className="text-text-secondary text-sm">
                Translation: "Use your brain a little" - You're trying to perform an operation with incompatible types. 
                For example, subtracting a string from a boolean.
              </p>
            </div>

            <div className="bg-dark-elevated p-4 rounded-lg border-l-4 border-yellow-500">
              <h4 className="font-semibold text-yellow-400 mb-2">Runtime Error</h4>
              <code className="text-text-primary text-sm block mb-2">"Lafda ho gaya"</code>
              <p className="text-text-secondary text-sm">
                Translation: "Trouble happened" - Something went wrong while running your program. 
                Could be division by zero, accessing invalid array index, etc.
              </p>
            </div>

            <div className="bg-dark-elevated p-4 rounded-lg border-l-4 border-yellow-600">
              <h4 className="font-semibold text-yellow-600 mb-2">Null/Undefined Error</h4>
              <code className="text-text-primary text-sm block mb-2">"Khali dimaag"</code>
              <p className="text-text-secondary text-sm">
                Translation: "Empty brain" - You're trying to use a variable that doesn't exist or has no value.
              </p>
            </div>

            <div className="bg-dark-elevated p-4 rounded-lg border-l-4 border-neon-orange">
              <h4 className="font-semibold text-neon-orange mb-2">Infinite Loop Error</h4>
              <code className="text-text-primary text-sm block mb-2">"Lafda ho gaya: Infinite loop detected!"</code>
              <p className="text-text-secondary text-sm">
                Your loop has run more than 10,000 times. Check your loop condition to make sure it can eventually become false.
              </p>
            </div>

            <div className="bg-dark-elevated p-4 rounded-lg border-l-4 border-red-600">
              <h4 className="font-semibold text-red-600 mb-2">Missing Exit Statement</h4>
              <code className="text-text-primary text-sm block mb-2">"Ye kya bakchodi likh di? Program must end with 'nikal lawde'"</code>
              <p className="text-text-secondary text-sm">
                Every KaleshScript program MUST end with <code className="bg-dark-bg px-2 py-1 rounded text-xs">nikal lawde</code>. 
                Add it at the end of your program.
              </p>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-text-primary flex items-center">
            <div className="w-1 h-7 bg-neon-yellow rounded-full mr-3"></div>
            Best Practices
          </h2>
          
          <div className="space-y-4">
            <div className="bg-dark-elevated p-4 rounded-lg border border-dark-border">
              <h4 className="font-semibold text-neon-yellow mb-2">1. Always End with nikal lawde</h4>
              <p className="text-text-secondary text-sm">
                This is not optional! Every program must end with the exit statement.
              </p>
            </div>

            <div className="bg-dark-elevated p-4 rounded-lg border border-dark-border">
              <h4 className="font-semibold text-neon-yellow mb-2">2. Use Comments</h4>
              <p className="text-text-secondary text-sm">
                Add comments to explain complex logic. Future you will thank present you!
              </p>
            </div>

            <div className="bg-dark-elevated p-4 rounded-lg border border-dark-border">
              <h4 className="font-semibold text-neon-yellow mb-2">3. Watch Your Loop Conditions</h4>
              <p className="text-text-secondary text-sm">
                Make sure your loops can eventually end. Avoid conditions like <code className="bg-dark-bg px-2 py-1 rounded text-xs">jab tak maa sahi na maane</code> 
                unless you have a break statement.
              </p>
            </div>

            <div className="bg-dark-elevated p-4 rounded-lg border border-dark-border">
              <h4 className="font-semibold text-neon-yellow mb-2">4. Type Consistency</h4>
              <p className="text-text-secondary text-sm">
                Be mindful of data types. You can't do math with strings and booleans mixed together.
              </p>
            </div>

            <div className="bg-dark-elevated p-4 rounded-lg border border-dark-border">
              <h4 className="font-semibold text-neon-yellow mb-2">5. Meaningful Variable Names</h4>
              <p className="text-text-secondary text-sm">
                Use descriptive names like <code className="bg-dark-bg px-2 py-1 rounded text-xs">naam</code>, 
                <code className="bg-dark-bg px-2 py-1 rounded text-xs">age</code>, 
                <code className="bg-dark-bg px-2 py-1 rounded text-xs">score</code> instead of 
                <code className="bg-dark-bg px-2 py-1 rounded text-xs">x</code>, 
                <code className="bg-dark-bg px-2 py-1 rounded text-xs">y</code>, 
                <code className="bg-dark-bg px-2 py-1 rounded text-xs">z</code>.
              </p>
            </div>
          </div>
        </section>

        {/* Complete Example */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-text-primary flex items-center">
            <div className="w-1 h-7 bg-neon-yellow rounded-full mr-3"></div>
            Complete Example Program
          </h2>
          <p className="text-text-secondary mb-4">
            Here's a comprehensive example that demonstrates multiple features:
          </p>
          <pre className="bg-dark-bg text-text-primary p-4 rounded-lg overflow-x-auto border border-dark-border font-mono text-sm">
{`// Delhi Temperature Checker
bhauk "=== Delhi Weather App ==="
bhauk ""

// Variables
chutiye ye city hai "Delhi"
chutiye ye temp hai 45
chutiye ye humidity hai 60

// Print info
bhauk "City:"
bhauk city
bhauk "Temperature:"
bhauk temp
bhauk "Humidity:"
bhauk humidity
bhauk ""

// Conditional check
bsdk agar temp > 40 kar: bhauk "Garmi bahut hai bc!"
bsdk agar temp < 15 kar: bhauk "Thandi hai bhai"

// Array of metro stations
chutiye ye stations hai ["Rajiv Chowk", "Kashmere Gate", "Chandni Chowk"]
bhauk "Popular Metro Stations:"
bhauk stations[0]
bhauk stations[1]

// Hash with Delhi facts
chutiye ye facts hai {
    "food": "Chole Bhature",
    "transport": "Metro",
    "language": "Hindi"
}

bhauk ""
bhauk "Best food:"
bhauk facts["food"]

// Function
kaand checkWeather(temperature) {
    bsdk agar temperature > 35 kar: bhauk "AC chala le"
    bsdk agar temperature < 20 kar: bhauk "Sweater pehen le"
}

bhauk ""
checkWeather(temp)

// Loop
bhauk ""
bhauk "Counting down:"
chutiye ye count hai 5
jab tak maa count > 0 na maane: count = count - 1
bhauk "Done!"

// Switch case
chutiye ye season hai "summer"
bhauk ""
bhauk "Season advice:"

mood season {
    dekh "summer": bhauk "Stay hydrated!"
    dekh "winter": bhauk "Bundle up!"
    dekh "monsoon": bhauk "Carry umbrella!"
    default: bhauk "Enjoy the weather!"
}

bhauk ""
bhauk "=== Program Complete ==="

nikal lawde`}
          </pre>
        </section>

        {/* Keywords Reference */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-text-primary flex items-center">
            <div className="w-1 h-7 bg-neon-yellow rounded-full mr-3"></div>
            Keywords Reference
          </h2>
          <p className="text-text-secondary mb-4">
            Quick reference of all KaleshScript keywords:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-dark-elevated p-4 rounded-lg border border-dark-border">
              <code className="text-neon-yellow font-semibold">chutiye ye ... hai</code>
              <p className="text-text-secondary text-sm mt-1">Variable declaration</p>
            </div>

            <div className="bg-dark-elevated p-4 rounded-lg border border-dark-border">
              <code className="text-neon-yellow font-semibold">bhauk</code>
              <p className="text-text-secondary text-sm mt-1">Print/output statement</p>
            </div>

            <div className="bg-dark-elevated p-4 rounded-lg border border-dark-border">
              <code className="text-neon-yellow font-semibold">sahi</code>
              <p className="text-text-secondary text-sm mt-1">Boolean true</p>
            </div>

            <div className="bg-dark-elevated p-4 rounded-lg border border-dark-border">
              <code className="text-neon-yellow font-semibold">bekaar</code>
              <p className="text-text-secondary text-sm mt-1">Boolean false</p>
            </div>

            <div className="bg-dark-elevated p-4 rounded-lg border border-dark-border">
              <code className="text-neon-yellow font-semibold">bsdk agar ... kar:</code>
              <p className="text-text-secondary text-sm mt-1">If statement</p>
            </div>

            <div className="bg-dark-elevated p-4 rounded-lg border border-dark-border">
              <code className="text-neon-yellow font-semibold">warna:</code>
              <p className="text-text-secondary text-sm mt-1">Else statement</p>
            </div>

            <div className="bg-dark-elevated p-4 rounded-lg border border-dark-border">
              <code className="text-neon-yellow font-semibold">jab tak maa ... na maane:</code>
              <p className="text-text-secondary text-sm mt-1">While loop</p>
            </div>

            <div className="bg-dark-elevated p-4 rounded-lg border border-dark-border">
              <code className="text-neon-yellow font-semibold">ruk jaa bc</code>
              <p className="text-text-secondary text-sm mt-1">Break statement</p>
            </div>

            <div className="bg-dark-elevated p-4 rounded-lg border border-dark-border">
              <code className="text-neon-yellow font-semibold">aage baddh bc</code>
              <p className="text-text-secondary text-sm mt-1">Continue statement</p>
            </div>

            <div className="bg-dark-elevated p-4 rounded-lg border border-dark-border">
              <code className="text-neon-yellow font-semibold">mood ... {"{ }"}</code>
              <p className="text-text-secondary text-sm mt-1">Switch statement</p>
            </div>

            <div className="bg-dark-elevated p-4 rounded-lg border border-dark-border">
              <code className="text-neon-yellow font-semibold">dekh ... :</code>
              <p className="text-text-secondary text-sm mt-1">Switch case</p>
            </div>

            <div className="bg-dark-elevated p-4 rounded-lg border border-dark-border">
              <code className="text-neon-yellow font-semibold">default:</code>
              <p className="text-text-secondary text-sm mt-1">Switch default case</p>
            </div>

            <div className="bg-dark-elevated p-4 rounded-lg border border-dark-border">
              <code className="text-neon-yellow font-semibold">kaand ... {"{ }"}</code>
              <p className="text-text-secondary text-sm mt-1">Function definition</p>
            </div>

            <div className="bg-dark-elevated p-4 rounded-lg border border-dark-border">
              <code className="text-neon-yellow font-semibold">try kar: ... , pakad mc:</code>
              <p className="text-text-secondary text-sm mt-1">Try-catch</p>
            </div>

            <div className="bg-dark-elevated p-4 rounded-lg border border-dark-border">
              <code className="text-neon-yellow font-semibold">Suna lawde()</code>
              <p className="text-text-secondary text-sm mt-1">Input function</p>
            </div>

            <div className="bg-dark-elevated p-4 rounded-lg border border-dark-border">
              <code className="text-neon-yellow font-semibold">nikal lawde</code>
              <p className="text-text-secondary text-sm mt-1">Exit program (REQUIRED)</p>
            </div>
          </div>
        </section>

        {/* Feedback Form */}
        <section id="feedback" className="pt-8">
          <FeedbackForm />
        </section>

        {/* Footer */}
        <section className="text-center pt-8 border-t border-dark-border mt-8">
          <p className="text-text-secondary mb-2">
            Tere baap ne mehnat se banayi hai
          </p>
          <p className="text-text-tertiary text-sm">
            KaleshScript - NOT RECOMMENDED FOR KIDS!
          </p>
          <div className="mt-4">
            <a
              href="https://github.com/darthvader58/kaleshscript"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon-yellow hover:underline text-sm"
            >
              View Source on GitHub
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
