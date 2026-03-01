package evaluator

import (
	"bufio"
	"fmt"
	"kaleshscript/object"
	"kaleshscript/parser"
	"os"
	"strings"
)

var (
	NULL     = &object.Null{}
	TRUE     = &object.Boolean{Value: true}
	FALSE    = &object.Boolean{Value: false}
	BREAK    = &object.Break{}
	CONTINUE = &object.Continue{}
)

func Eval(node parser.Node, env *object.Environment) object.Object {
	switch node := node.(type) {
	case *parser.Program:
		return evalProgram(node, env)

	case *parser.VarStatement:
		val := Eval(node.Value, env)
		if isError(val) {
			return val
		}
		env.Set(node.Name, val)
		return val

	case *parser.IfStatement:
		return evalIfStatement(node, env)

	case *parser.PrintStatement:
		val := Eval(node.Value, env)
		if isError(val) {
			return val
		}
		fmt.Println(val.Inspect())
		return NULL

	case *parser.FunctionStatement:
		fn := &object.Function{
			Parameters: node.Parameters,
			Body:       "",
			Env:        env,
		}
		env.Set(node.Name, fn)
		return fn

	case *parser.LoopStatement:
		return evalLoopStatement(node, env)

	case *parser.BreakStatement:
		return BREAK

	case *parser.ContinueStatement:
		return CONTINUE

	case *parser.SwitchStatement:
		return evalSwitchStatement(node, env)

	case *parser.TryStatement:
		return evalTryStatement(node, env)

	case *parser.ClassStatement:
		return evalClassStatement(node, env)

	case *parser.BlockStatement:
		return evalBlockStatement(node, env)

	case *parser.ExpressionStatement:
		return Eval(node.Expression, env)

	case *parser.IntegerLiteral:
		return &object.Integer{Value: node.Value}

	case *parser.StringLiteral:
		return &object.String{Value: node.Value}

	case *parser.BooleanLiteral:
		return nativeBoolToBooleanObject(node.Value)

	case *parser.Identifier:
		return evalIdentifier(node, env)

	case *parser.InfixExpression:
		left := Eval(node.Left, env)
		if isError(left) {
			return left
		}
		right := Eval(node.Right, env)
		if isError(right) {
			return right
		}
		return evalInfixExpression(node.Operator, left, right)

	case *parser.CallExpression:
		return evalCallExpression(node, env)

	case *parser.InputExpression:
		return evalInputExpression()

	case *parser.ArrayLiteral:
		elements := evalExpressions(node.Elements, env)
		if len(elements) == 1 && isError(elements[0]) {
			return elements[0]
		}
		return &object.Array{Elements: elements}

	case *parser.HashLiteral:
		return evalHashLiteral(node, env)

	case *parser.IndexExpression:
		left := Eval(node.Left, env)
		if isError(left) {
			return left
		}
		index := Eval(node.Index, env)
		if isError(index) {
			return index
		}
		return evalIndexExpression(left, index)

	case *parser.AssignExpression:
		val := Eval(node.Value, env)
		if isError(val) {
			return val
		}
		env.Set(node.Name, val)
		return val

	case *parser.MemberExpression:
		return evalMemberExpression(node, env)

	case *parser.NewExpression:
		return evalNewExpression(node, env)
	}

	return NULL
}

func evalProgram(program *parser.Program, env *object.Environment) object.Object {
	var result object.Object

	for _, statement := range program.Statements {
		result = Eval(statement, env)

		if result != nil {
			switch result.Type() {
			case object.RETURN_OBJ:
				return result.(*object.ReturnValue).Value
			case object.ERROR_OBJ:
				return result
			}
		}
	}

	return result
}

func evalBlockStatement(block *parser.BlockStatement, env *object.Environment) object.Object {
	var result object.Object

	for _, statement := range block.Statements {
		result = Eval(statement, env)

		if result != nil {
			rt := result.Type()
			if rt == object.RETURN_OBJ || rt == object.ERROR_OBJ || 
			   rt == object.BREAK_OBJ || rt == object.CONTINUE_OBJ {
				return result
			}
		}
	}

	return result
}

func evalIfStatement(ie *parser.IfStatement, env *object.Environment) object.Object {
	condition := Eval(ie.Condition, env)
	if isError(condition) {
		return condition
	}

	if isTruthy(condition) {
		return Eval(ie.Consequence, env)
	} else if ie.Alternative != nil {
		return Eval(ie.Alternative, env)
	} else {
		return NULL
	}
}

func evalLoopStatement(ls *parser.LoopStatement, env *object.Environment) object.Object {
	var result object.Object

	for {
		condition := Eval(ls.Condition, env)
		if isError(condition) {
			return condition
		}

		if !isTruthy(condition) {
			break
		}

		result = Eval(ls.Body, env)

		if result != nil {
			if result.Type() == object.BREAK_OBJ {
				break
			}
			if result.Type() == object.CONTINUE_OBJ {
				continue
			}
			if result.Type() == object.RETURN_OBJ || result.Type() == object.ERROR_OBJ {
				return result
			}
		}
	}

	return NULL
}

func evalSwitchStatement(ss *parser.SwitchStatement, env *object.Environment) object.Object {
	value := Eval(ss.Value, env)
	if isError(value) {
		return value
	}

	for _, caseClause := range ss.Cases {
		caseValue := Eval(caseClause.Value, env)
		if isError(caseValue) {
			return caseValue
		}

		if value.Inspect() == caseValue.Inspect() {
			return Eval(caseClause.Body, env)
		}
	}

	if ss.Default != nil {
		return Eval(ss.Default, env)
	}

	return NULL
}

func evalTryStatement(ts *parser.TryStatement, env *object.Environment) object.Object {
	result := Eval(ts.TryBlock, env)

	if isError(result) {
		return Eval(ts.CatchBlock, env)
	}

	return result
}

func evalClassStatement(cs *parser.ClassStatement, env *object.Environment) object.Object {
	class := &object.Class{
		Name:    cs.Name,
		Methods: make(map[string]*object.Function),
		Env:     env,
	}

	for name, method := range cs.Methods {
		fn := &object.Function{
			Parameters: method.Parameters,
			Body:       "",
			Env:        env,
		}
		class.Methods[name] = fn
	}

	env.Set(cs.Name, class)
	return class
}

func evalIdentifier(node *parser.Identifier, env *object.Environment) object.Object {
	if val, ok := env.Get(node.Value); ok {
		return val
	}

	if builtin, ok := builtins[node.Value]; ok {
		return builtin
	}

	return newError("identifier not found: " + node.Value)
}

func evalInfixExpression(operator string, left, right object.Object) object.Object {
	switch {
	case left.Type() == object.INTEGER_OBJ && right.Type() == object.INTEGER_OBJ:
		return evalIntegerInfixExpression(operator, left, right)
	case left.Type() == object.STRING_OBJ && right.Type() == object.STRING_OBJ:
		return evalStringInfixExpression(operator, left, right)
	case operator == "==":
		return nativeBoolToBooleanObject(left == right)
	case operator == "!=":
		return nativeBoolToBooleanObject(left != right)
	default:
		return newError("Dimag use kar thoda: %s %s %s", left.Type(), operator, right.Type())
	}
}

func evalIntegerInfixExpression(operator string, left, right object.Object) object.Object {
	leftVal := left.(*object.Integer).Value
	rightVal := right.(*object.Integer).Value

	switch operator {
	case "+":
		return &object.Integer{Value: leftVal + rightVal}
	case "-":
		return &object.Integer{Value: leftVal - rightVal}
	case "*":
		return &object.Integer{Value: leftVal * rightVal}
	case "/":
		if rightVal == 0 {
			return newError("Dimag use kar thoda: division by zero")
		}
		return &object.Integer{Value: leftVal / rightVal}
	case "<":
		return nativeBoolToBooleanObject(leftVal < rightVal)
	case ">":
		return nativeBoolToBooleanObject(leftVal > rightVal)
	case "==":
		return nativeBoolToBooleanObject(leftVal == rightVal)
	case "!=":
		return nativeBoolToBooleanObject(leftVal != rightVal)
	default:
		return newError("unknown operator: %s", operator)
	}
}

func evalStringInfixExpression(operator string, left, right object.Object) object.Object {
	leftVal := left.(*object.String).Value
	rightVal := right.(*object.String).Value

	switch operator {
	case "+":
		return &object.String{Value: leftVal + rightVal}
	case "==":
		return nativeBoolToBooleanObject(leftVal == rightVal)
	case "!=":
		return nativeBoolToBooleanObject(leftVal != rightVal)
	default:
		return newError("unknown operator: %s", operator)
	}
}

func evalCallExpression(ce *parser.CallExpression, env *object.Environment) object.Object {
	function := Eval(ce.Function, env)
	if isError(function) {
		return function
	}

	args := evalExpressions(ce.Arguments, env)
	if len(args) == 1 && isError(args[0]) {
		return args[0]
	}

	return applyFunction(function, args, env)
}

func evalExpressions(exps []parser.Expression, env *object.Environment) []object.Object {
	var result []object.Object

	for _, e := range exps {
		evaluated := Eval(e, env)
		if isError(evaluated) {
			return []object.Object{evaluated}
		}
		result = append(result, evaluated)
	}

	return result
}

func applyFunction(fn object.Object, args []object.Object, env *object.Environment) object.Object {
	switch fn := fn.(type) {
	case *object.Function:
		_ = extendFunctionEnv(fn, args)
		return NULL
	case *object.Builtin:
		return fn.Fn(args...)
	default:
		return newError("not a function: %s", fn.Type())
	}
}

func extendFunctionEnv(fn *object.Function, args []object.Object) *object.Environment {
	env := object.NewEnclosedEnvironment(fn.Env)

	for paramIdx, param := range fn.Parameters {
		if paramIdx < len(args) {
			env.Set(param, args[paramIdx])
		}
	}

	return env
}

func evalInputExpression() object.Object {
	reader := bufio.NewReader(os.Stdin)
	text, _ := reader.ReadString('\n')
	return &object.String{Value: strings.TrimSpace(text)}
}

func evalHashLiteral(node *parser.HashLiteral, env *object.Environment) object.Object {
	pairs := make(map[string]object.HashPair)

	for keyNode, valueNode := range node.Pairs {
		key := Eval(keyNode, env)
		if isError(key) {
			return key
		}

		value := Eval(valueNode, env)
		if isError(value) {
			return value
		}

		pairs[key.Inspect()] = object.HashPair{Key: key, Value: value}
	}

	return &object.Hash{Pairs: pairs}
}

func evalIndexExpression(left, index object.Object) object.Object {
	switch {
	case left.Type() == object.ARRAY_OBJ && index.Type() == object.INTEGER_OBJ:
		return evalArrayIndexExpression(left, index)
	case left.Type() == object.HASH_OBJ:
		return evalHashIndexExpression(left, index)
	default:
		return newError("index operator not supported: %s", left.Type())
	}
}

func evalArrayIndexExpression(array, index object.Object) object.Object {
	arrayObject := array.(*object.Array)
	idx := index.(*object.Integer).Value
	max := int64(len(arrayObject.Elements) - 1)

	if idx < 0 || idx > max {
		return NULL
	}

	return arrayObject.Elements[idx]
}

func evalHashIndexExpression(hash, index object.Object) object.Object {
	hashObject := hash.(*object.Hash)
	key := index.Inspect()

	pair, ok := hashObject.Pairs[key]
	if !ok {
		return NULL
	}

	return pair.Value
}

func evalMemberExpression(me *parser.MemberExpression, env *object.Environment) object.Object {
	obj := Eval(me.Object, env)
	if isError(obj) {
		return obj
	}

	if instance, ok := obj.(*object.Instance); ok {
		if attr, ok := instance.Attributes[me.Property]; ok {
			return attr
		}
		if method, ok := instance.Class.Methods[me.Property]; ok {
			return method
		}
	}

	return newError("property not found: %s", me.Property)
}

func evalNewExpression(ne *parser.NewExpression, env *object.Environment) object.Object {
	class, ok := env.Get(ne.ClassName)
	if !ok {
		return newError("class not found: %s", ne.ClassName)
	}

	classObj, ok := class.(*object.Class)
	if !ok {
		return newError("not a class: %s", ne.ClassName)
	}

	instance := &object.Instance{
		Class:      classObj,
		Attributes: make(map[string]object.Object),
	}

	return instance
}

func isTruthy(obj object.Object) bool {
	switch obj {
	case NULL:
		return false
	case TRUE:
		return true
	case FALSE:
		return false
	default:
		return true
	}
}

func nativeBoolToBooleanObject(input bool) *object.Boolean {
	if input {
		return TRUE
	}
	return FALSE
}

func isError(obj object.Object) bool {
	if obj != nil {
		return obj.Type() == object.ERROR_OBJ
	}
	return false
}

func newError(format string, a ...interface{}) *object.Error {
	return &object.Error{Message: fmt.Sprintf(format, a...)}
}

var builtins = map[string]*object.Builtin{
	"len": {
		Fn: func(args ...object.Object) object.Object {
			if len(args) != 1 {
				return newError("wrong number of arguments")
			}

			switch arg := args[0].(type) {
			case *object.String:
				return &object.Integer{Value: int64(len(arg.Value))}
			case *object.Array:
				return &object.Integer{Value: int64(len(arg.Elements))}
			default:
				return newError("argument to `len` not supported")
			}
		},
	},
}
