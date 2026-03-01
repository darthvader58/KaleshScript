package main

import (
	"bufio"
	"fmt"
	"kaleshscript/evaluator"
	"kaleshscript/lexer"
	"kaleshscript/object"
	"kaleshscript/parser"
	"os"
)

func main() {
	if len(os.Args) > 1 {
		runFile(os.Args[1])
	} else {
		runREPL()
	}
}

func runFile(filename string) {
	content, err := os.ReadFile(filename)
	if err != nil {
		fmt.Printf("Lafda ho gaya: %v\n", err)
		os.Exit(1)
	}

	l := lexer.New(string(content))
	p := parser.New(l)
	program := p.ParseProgram()

	if len(p.Errors()) != 0 {
		for _, msg := range p.Errors() {
			fmt.Printf("Ye kya bakchodi likh di? %s\n", msg)
		}
		os.Exit(1)
	}

	env := object.NewEnvironment()
	result := evaluator.Eval(program, env)
	if result != nil && result.Type() == object.ERROR_OBJ {
		fmt.Printf("Lafda ho gaya: %s\n", result.Inspect())
		os.Exit(1)
	}
}

func runREPL() {
	scanner := bufio.NewScanner(os.Stdin)
	env := object.NewEnvironment()

	fmt.Println("KaleshScript REPL - Delhi ki coding language")
	fmt.Println("Type 'nikal lawde' to exit")

	for {
		fmt.Print(">> ")
		if !scanner.Scan() {
			return
		}

		line := scanner.Text()
		if line == "nikal lawde" {
			fmt.Println("Chal theek hai, baad mein milte hain!")
			return
		}

		l := lexer.New(line)
		p := parser.New(l)
		program := p.ParseProgram()

		if len(p.Errors()) != 0 {
			for _, msg := range p.Errors() {
				fmt.Printf("Ye kya bakchodi likh di? %s\n", msg)
			}
			continue
		}

		result := evaluator.Eval(program, env)
		if result != nil {
			fmt.Println(result.Inspect())
		}
	}
}
