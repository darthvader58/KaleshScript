package object

import (
	"fmt"
	"strings"
)

type ObjectType string

const (
	INTEGER_OBJ  = "INTEGER"
	BOOLEAN_OBJ  = "BOOLEAN"
	STRING_OBJ   = "STRING"
	NULL_OBJ     = "NULL"
	RETURN_OBJ   = "RETURN"
	ERROR_OBJ    = "ERROR"
	FUNCTION_OBJ = "FUNCTION"
	BUILTIN_OBJ  = "BUILTIN"
	ARRAY_OBJ    = "ARRAY"
	HASH_OBJ     = "HASH"
	BREAK_OBJ    = "BREAK"
	CONTINUE_OBJ = "CONTINUE"
	EXIT_OBJ     = "EXIT"
	CLASS_OBJ    = "CLASS"
	INSTANCE_OBJ = "INSTANCE"
)

type Object interface {
	Type() ObjectType
	Inspect() string
}

type Integer struct {
	Value int64
}

func (i *Integer) Type() ObjectType { return INTEGER_OBJ }
func (i *Integer) Inspect() string  { return fmt.Sprintf("%d", i.Value) }

type Boolean struct {
	Value bool
}

func (b *Boolean) Type() ObjectType { return BOOLEAN_OBJ }
func (b *Boolean) Inspect() string {
	if b.Value {
		return "sahi"
	}
	return "bekaar"
}

type String struct {
	Value string
}

func (s *String) Type() ObjectType { return STRING_OBJ }
func (s *String) Inspect() string  { return s.Value }

type Null struct{}

func (n *Null) Type() ObjectType { return NULL_OBJ }
func (n *Null) Inspect() string  { return "khali dimaag" }

type ReturnValue struct {
	Value Object
}

func (rv *ReturnValue) Type() ObjectType { return RETURN_OBJ }
func (rv *ReturnValue) Inspect() string  { return rv.Value.Inspect() }

type Error struct {
	Message string
}

func (e *Error) Type() ObjectType { return ERROR_OBJ }
func (e *Error) Inspect() string  { return "Lafda: " + e.Message }

type Function struct {
	Parameters []string
	Body       string
	Env        *Environment
}

func (f *Function) Type() ObjectType { return FUNCTION_OBJ }
func (f *Function) Inspect() string {
	return fmt.Sprintf("kaand(%s)", strings.Join(f.Parameters, ", "))
}

type BuiltinFunction func(args ...Object) Object

type Builtin struct {
	Fn BuiltinFunction
}

func (b *Builtin) Type() ObjectType { return BUILTIN_OBJ }
func (b *Builtin) Inspect() string  { return "builtin function" }

type Array struct {
	Elements []Object
}

func (ao *Array) Type() ObjectType { return ARRAY_OBJ }
func (ao *Array) Inspect() string {
	var out strings.Builder
	elements := []string{}
	for _, e := range ao.Elements {
		elements = append(elements, e.Inspect())
	}
	out.WriteString("[")
	out.WriteString(strings.Join(elements, ", "))
	out.WriteString("]")
	return out.String()
}

type HashPair struct {
	Key   Object
	Value Object
}

type Hash struct {
	Pairs map[string]HashPair
}

func (h *Hash) Type() ObjectType { return HASH_OBJ }
func (h *Hash) Inspect() string {
	var out strings.Builder
	pairs := []string{}
	for _, pair := range h.Pairs {
		pairs = append(pairs, fmt.Sprintf("%s: %s", pair.Key.Inspect(), pair.Value.Inspect()))
	}
	out.WriteString("{")
	out.WriteString(strings.Join(pairs, ", "))
	out.WriteString("}")
	return out.String()
}

type Break struct{}

func (b *Break) Type() ObjectType { return BREAK_OBJ }
func (b *Break) Inspect() string  { return "break" }

type Continue struct{}

func (c *Continue) Type() ObjectType { return CONTINUE_OBJ }
func (c *Continue) Inspect() string  { return "continue" }

type Exit struct{}

func (e *Exit) Type() ObjectType { return EXIT_OBJ }
func (e *Exit) Inspect() string  { return "exit" }

type Class struct {
	Name    string
	Methods map[string]*Function
	Env     *Environment
}

func (c *Class) Type() ObjectType { return CLASS_OBJ }
func (c *Class) Inspect() string  { return "gang " + c.Name }

type Instance struct {
	Class      *Class
	Attributes map[string]Object
}

func (i *Instance) Type() ObjectType { return INSTANCE_OBJ }
func (i *Instance) Inspect() string  { return i.Class.Name + " ka member" }

type Environment struct {
	store map[string]Object
	outer *Environment
}

func NewEnvironment() *Environment {
	s := make(map[string]Object)
	return &Environment{store: s, outer: nil}
}

func NewEnclosedEnvironment(outer *Environment) *Environment {
	env := NewEnvironment()
	env.outer = outer
	return env
}

func (e *Environment) Get(name string) (Object, bool) {
	obj, ok := e.store[name]
	if !ok && e.outer != nil {
		obj, ok = e.outer.Get(name)
	}
	return obj, ok
}

func (e *Environment) Set(name string, val Object) Object {
	e.store[name] = val
	return val
}
