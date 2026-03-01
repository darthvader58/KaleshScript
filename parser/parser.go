package parser

import (
	"fmt"
	"kaleshscript/lexer"
	"strconv"
)

type Parser struct {
	l      *lexer.Lexer
	errors []string

	curToken  lexer.Token
	peekToken lexer.Token
}

func New(l *lexer.Lexer) *Parser {
	p := &Parser{l: l, errors: []string{}}
	p.nextToken()
	p.nextToken()
	return p
}

func (p *Parser) nextToken() {
	p.curToken = p.peekToken
	p.peekToken = p.l.NextToken()
}

func (p *Parser) Errors() []string {
	return p.errors
}

func (p *Parser) peekError(t lexer.TokenType) {
	msg := fmt.Sprintf("expected next token to be %s, got %s instead", t, p.peekToken.Type)
	p.errors = append(p.errors, msg)
}

func (p *Parser) ParseProgram() *Program {
	program := &Program{}
	program.Statements = []Statement{}

	for p.curToken.Type != lexer.EOF {
		stmt := p.parseStatement()
		if stmt != nil {
			program.Statements = append(program.Statements, stmt)
		}
		p.nextToken()
	}

	return program
}

func (p *Parser) parseStatement() Statement {
	switch p.curToken.Type {
	case lexer.VAR:
		return p.parseVarStatement()
	case lexer.IF:
		return p.parseIfStatement()
	case lexer.PRINT:
		return p.parsePrintStatement()
	case lexer.FUNCTION:
		return p.parseFunctionStatement()
	case lexer.LOOP:
		return p.parseLoopStatement()
	case lexer.BREAK:
		return p.parseBreakStatement()
	case lexer.CONTINUE:
		return p.parseContinueStatement()
	case lexer.SWITCH:
		return p.parseSwitchStatement()
	case lexer.TRY:
		return p.parseTryStatement()
	case lexer.CLASS:
		return p.parseClassStatement()
	default:
		return p.parseExpressionStatement()
	}
}

func (p *Parser) parseVarStatement() Statement {
	stmt := &VarStatement{Token: p.curToken}

	if !p.expectPeek(lexer.YE) {
		return nil
	}

	if !p.expectPeek(lexer.IDENT) {
		return nil
	}

	stmt.Name = p.curToken.Literal

	if !p.expectPeek(lexer.HAI) {
		return nil
	}

	p.nextToken()
	stmt.Value = p.parseExpression()

	return stmt
}

func (p *Parser) parseIfStatement() Statement {
	stmt := &IfStatement{Token: p.curToken}

	// Skip optional "agar" after "bsdk"
	if p.peekToken.Type == lexer.AGAR {
		p.nextToken()
	}

	p.nextToken()
	stmt.Condition = p.parseExpression()

	// Skip optional "kar"
	if p.peekToken.Type == lexer.KAR {
		p.nextToken()
	}

	if !p.expectPeek(lexer.COLON) {
		return nil
	}

	p.nextToken()
	stmt.Consequence = p.parseBlockStatement()

	// Check if there's a warna (else) clause
	if p.curToken.Type == lexer.WARNA || p.peekToken.Type == lexer.WARNA {
		if p.curToken.Type != lexer.WARNA {
			p.nextToken()
		}
		if !p.expectPeek(lexer.COLON) {
			return nil
		}
		p.nextToken()
		stmt.Alternative = p.parseBlockStatement()
	}

	return stmt
}

func (p *Parser) parsePrintStatement() Statement {
	stmt := &PrintStatement{Token: p.curToken}
	p.nextToken()
	stmt.Value = p.parseExpression()
	return stmt
}

func (p *Parser) parseFunctionStatement() Statement {
	stmt := &FunctionStatement{Token: p.curToken}

	if !p.expectPeek(lexer.IDENT) {
		return nil
	}

	stmt.Name = p.curToken.Literal

	if !p.expectPeek(lexer.LPAREN) {
		return nil
	}

	stmt.Parameters = p.parseFunctionParameters()

	if !p.expectPeek(lexer.LBRACE) {
		return nil
	}

	stmt.Body = p.parseBlockStatement()

	return stmt
}

func (p *Parser) parseFunctionParameters() []string {
	params := []string{}

	if p.peekToken.Type == lexer.RPAREN {
		p.nextToken()
		return params
	}

	p.nextToken()
	params = append(params, p.curToken.Literal)

	for p.peekToken.Type == lexer.COMMA {
		p.nextToken()
		p.nextToken()
		params = append(params, p.curToken.Literal)
	}

	if !p.expectPeek(lexer.RPAREN) {
		return nil
	}

	return params
}

func (p *Parser) parseLoopStatement() Statement {
	stmt := &LoopStatement{Token: p.curToken}

	if !p.expectPeek(lexer.TAK) {
		return nil
	}

	if !p.expectPeek(lexer.MAA) {
		return nil
	}

	p.nextToken()
	stmt.Condition = p.parseExpression()

	if p.peekToken.Type == lexer.NA {
		p.nextToken()
	}
	if p.peekToken.Type == lexer.MAANE {
		p.nextToken()
	}

	if !p.expectPeek(lexer.COLON) {
		return nil
	}

	p.nextToken()
	stmt.Body = p.parseBlockStatement()

	return stmt
}

func (p *Parser) parseBreakStatement() Statement {
	stmt := &BreakStatement{Token: p.curToken}
	if p.peekToken.Type == lexer.JAA {
		p.nextToken()
	}
	if p.peekToken.Type == lexer.BC {
		p.nextToken()
	}
	return stmt
}

func (p *Parser) parseContinueStatement() Statement {
	stmt := &ContinueStatement{Token: p.curToken}
	if p.peekToken.Type == lexer.BADDH {
		p.nextToken()
	}
	if p.peekToken.Type == lexer.BC {
		p.nextToken()
	}
	return stmt
}

func (p *Parser) parseSwitchStatement() Statement {
	stmt := &SwitchStatement{Token: p.curToken}

	p.nextToken()
	stmt.Value = p.parseExpression()

	if !p.expectPeek(lexer.LBRACE) {
		return nil
	}

	stmt.Cases = []CaseClause{}

	for p.peekToken.Type != lexer.RBRACE && p.peekToken.Type != lexer.EOF {
		p.nextToken()
		if p.curToken.Type == lexer.CASE {
			caseClause := CaseClause{}
			p.nextToken()
			caseClause.Value = p.parseExpression()

			if !p.expectPeek(lexer.COLON) {
				return nil
			}

			p.nextToken()
			caseClause.Body = p.parseBlockStatement()
			stmt.Cases = append(stmt.Cases, caseClause)
		} else if p.curToken.Type == lexer.DEFAULT {
			if !p.expectPeek(lexer.COLON) {
				return nil
			}
			p.nextToken()
			stmt.Default = p.parseBlockStatement()
		}
	}

	if !p.expectPeek(lexer.RBRACE) {
		return nil
	}

	return stmt
}

func (p *Parser) parseTryStatement() Statement {
	stmt := &TryStatement{Token: p.curToken}

	if p.peekToken.Type == lexer.KAR {
		p.nextToken()
	}

	if !p.expectPeek(lexer.COLON) {
		return nil
	}

	p.nextToken()
	stmt.TryBlock = p.parseBlockStatement()

	if p.peekToken.Type == lexer.COMMA {
		p.nextToken()
	}

	if !p.expectPeek(lexer.PAKAD) {
		return nil
	}

	if p.peekToken.Type == lexer.MC {
		p.nextToken()
	}

	if !p.expectPeek(lexer.COLON) {
		return nil
	}

	p.nextToken()
	stmt.CatchBlock = p.parseBlockStatement()

	return stmt
}

func (p *Parser) parseClassStatement() Statement {
	stmt := &ClassStatement{Token: p.curToken}

	if !p.expectPeek(lexer.IDENT) {
		return nil
	}

	stmt.Name = p.curToken.Literal

	if !p.expectPeek(lexer.LBRACE) {
		return nil
	}

	stmt.Methods = make(map[string]*FunctionStatement)

	for p.peekToken.Type != lexer.RBRACE && p.peekToken.Type != lexer.EOF {
		p.nextToken()
		if p.curToken.Type == lexer.FUNCTION {
			method := p.parseFunctionStatement().(*FunctionStatement)
			stmt.Methods[method.Name] = method
		}
	}

	if !p.expectPeek(lexer.RBRACE) {
		return nil
	}

	return stmt
}

func (p *Parser) parseBlockStatement() *BlockStatement {
	block := &BlockStatement{Token: p.curToken}
	block.Statements = []Statement{}

	// For now, just parse a single statement after the colon
	stmt := p.parseStatement()
	if stmt != nil {
		block.Statements = append(block.Statements, stmt)
	}

	return block
}

func (p *Parser) parseExpressionStatement() Statement {
	stmt := &ExpressionStatement{Token: p.curToken}
	stmt.Expression = p.parseExpression()
	return stmt
}

func (p *Parser) parseExpression() Expression {
	return p.parseComparison()
}

func (p *Parser) parseComparison() Expression {
	left := p.parseAdditive()

	for p.peekToken.Type == lexer.EQ || p.peekToken.Type == lexer.NOT_EQ ||
		p.peekToken.Type == lexer.LT || p.peekToken.Type == lexer.GT {
		p.nextToken()
		op := p.curToken.Literal
		p.nextToken()
		right := p.parseAdditive()
		left = &InfixExpression{Left: left, Operator: op, Right: right}
	}

	return left
}

func (p *Parser) parseAdditive() Expression {
	left := p.parseMultiplicative()

	for p.peekToken.Type == lexer.PLUS || p.peekToken.Type == lexer.MINUS {
		p.nextToken()
		op := p.curToken.Literal
		p.nextToken()
		right := p.parseMultiplicative()
		left = &InfixExpression{Left: left, Operator: op, Right: right}
	}

	return left
}

func (p *Parser) parseMultiplicative() Expression {
	left := p.parsePrimary()

	for p.peekToken.Type == lexer.ASTERISK || p.peekToken.Type == lexer.SLASH {
		p.nextToken()
		op := p.curToken.Literal
		p.nextToken()
		right := p.parsePrimary()
		left = &InfixExpression{Left: left, Operator: op, Right: right}
	}

	return left
}

func (p *Parser) parsePrimary() Expression {
	switch p.curToken.Type {
	case lexer.INT:
		val, _ := strconv.ParseInt(p.curToken.Literal, 0, 64)
		return &IntegerLiteral{Value: val}
	case lexer.STRING:
		return &StringLiteral{Value: p.curToken.Literal}
	case lexer.TRUE:
		return &BooleanLiteral{Value: true}
	case lexer.FALSE:
		return &BooleanLiteral{Value: false}
	case lexer.IDENT:
		ident := &Identifier{Value: p.curToken.Literal}
		if p.peekToken.Type == lexer.LPAREN {
			return p.parseCallExpression(ident)
		}
		if p.peekToken.Type == lexer.LBRACKET {
			return p.parseIndexExpression(ident)
		}
		if p.peekToken.Type == lexer.DOT {
			return p.parseMemberExpression(ident)
		}
		if p.peekToken.Type == lexer.ASSIGN {
			p.nextToken()
			p.nextToken()
			value := p.parseExpression()
			return &AssignExpression{Name: ident.Value, Value: value}
		}
		return ident
	case lexer.INPUT:
		return p.parseInputExpression()
	case lexer.LBRACKET:
		return p.parseArrayLiteral()
	case lexer.LBRACE:
		return p.parseHashLiteral()
	case lexer.NEW:
		return p.parseNewExpression()
	case lexer.LPAREN:
		p.nextToken()
		exp := p.parseExpression()
		if !p.expectPeek(lexer.RPAREN) {
			return nil
		}
		return exp
	default:
		p.errors = append(p.errors, fmt.Sprintf("unexpected token: %s", p.curToken.Literal))
		return nil
	}
}

func (p *Parser) parseCallExpression(function Expression) Expression {
	exp := &CallExpression{Function: function}
	exp.Arguments = p.parseCallArguments()
	return exp
}

func (p *Parser) parseCallArguments() []Expression {
	args := []Expression{}

	if !p.expectPeek(lexer.LPAREN) {
		return nil
	}

	if p.peekToken.Type == lexer.RPAREN {
		p.nextToken()
		return args
	}

	p.nextToken()
	args = append(args, p.parseExpression())

	for p.peekToken.Type == lexer.COMMA {
		p.nextToken()
		p.nextToken()
		args = append(args, p.parseExpression())
	}

	if !p.expectPeek(lexer.RPAREN) {
		return nil
	}

	return args
}

func (p *Parser) parseInputExpression() Expression {
	exp := &InputExpression{Token: p.curToken}

	if !p.expectPeek(lexer.LAWDE) {
		return nil
	}

	if !p.expectPeek(lexer.LPAREN) {
		return nil
	}

	if !p.expectPeek(lexer.RPAREN) {
		return nil
	}

	return exp
}

func (p *Parser) parseArrayLiteral() Expression {
	array := &ArrayLiteral{Token: p.curToken}
	array.Elements = []Expression{}

	if p.peekToken.Type == lexer.RBRACKET {
		p.nextToken()
		return array
	}

	p.nextToken()
	array.Elements = append(array.Elements, p.parseExpression())

	for p.peekToken.Type == lexer.COMMA {
		p.nextToken()
		p.nextToken()
		array.Elements = append(array.Elements, p.parseExpression())
	}

	if !p.expectPeek(lexer.RBRACKET) {
		return nil
	}

	return array
}

func (p *Parser) parseHashLiteral() Expression {
	hash := &HashLiteral{Token: p.curToken}
	hash.Pairs = make(map[Expression]Expression)

	for p.peekToken.Type != lexer.RBRACE && p.peekToken.Type != lexer.EOF {
		p.nextToken()
		key := p.parseExpression()

		if !p.expectPeek(lexer.COLON) {
			return nil
		}

		p.nextToken()
		value := p.parseExpression()

		hash.Pairs[key] = value

		if p.peekToken.Type != lexer.RBRACE && !p.expectPeek(lexer.COMMA) {
			return nil
		}
	}

	if !p.expectPeek(lexer.RBRACE) {
		return nil
	}

	return hash
}

func (p *Parser) parseIndexExpression(left Expression) Expression {
	exp := &IndexExpression{Left: left}

	if !p.expectPeek(lexer.LBRACKET) {
		return nil
	}

	p.nextToken()
	exp.Index = p.parseExpression()

	if !p.expectPeek(lexer.RBRACKET) {
		return nil
	}

	return exp
}

func (p *Parser) parseMemberExpression(left Expression) Expression {
	exp := &MemberExpression{Object: left}

	if !p.expectPeek(lexer.DOT) {
		return nil
	}

	if !p.expectPeek(lexer.IDENT) {
		return nil
	}

	exp.Property = p.curToken.Literal

	if p.peekToken.Type == lexer.LPAREN {
		return p.parseCallExpression(exp)
	}

	return exp
}

func (p *Parser) parseNewExpression() Expression {
	exp := &NewExpression{Token: p.curToken}

	if !p.expectPeek(lexer.IDENT) {
		return nil
	}

	exp.ClassName = p.curToken.Literal

	if p.peekToken.Type == lexer.LPAREN {
		exp.Arguments = p.parseCallArguments()
	}

	return exp
}

func (p *Parser) expectPeek(t lexer.TokenType) bool {
	if p.peekToken.Type == t {
		p.nextToken()
		return true
	}
	p.peekError(t)
	return false
}
