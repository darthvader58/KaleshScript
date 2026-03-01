package lexer

import "unicode"

type TokenType string

const (
	ILLEGAL = "ILLEGAL"
	EOF     = "EOF"
	
	// Identifiers + literals
	IDENT  = "IDENT"
	INT    = "INT"
	STRING = "STRING"
	
	// Operators
	ASSIGN = "="
	PLUS   = "+"
	MINUS  = "-"
	BANG   = "!"
	ASTERISK = "*"
	SLASH  = "/"
	LT     = "<"
	GT     = ">"
	EQ     = "=="
	NOT_EQ = "!="
	
	// Delimiters
	COMMA     = ","
	COLON     = ":"
	LPAREN    = "("
	RPAREN    = ")"
	LBRACE    = "{"
	RBRACE    = "}"
	LBRACKET  = "["
	RBRACKET  = "]"
	
	// Keywords
	VAR      = "chutiye"
	YE       = "ye"
	HAI      = "hai"
	IF       = "bsdk"
	AGAR     = "agar"
	KAR      = "kar"
	WARNA    = "warna"
	PRINT    = "bhauk"
	INPUT    = "Suna"
	LAWDE    = "lawde"
	FUNCTION = "kaand"
	TRUE     = "sahi"
	FALSE    = "bekaar"
	LOOP     = "jab"
	TAK      = "tak"
	MAA      = "maa"
	NA       = "na"
	MAANE    = "maane"
	BREAK    = "ruk"
	JAA      = "jaa"
	BC       = "bc"
	CONTINUE = "aage"
	BADDH    = "baddh"
	EXIT     = "nikal"
	SWITCH   = "mood"
	CASE     = "dekh"
	DEFAULT  = "default"
	TRY      = "try"
	KAR_TRY  = "kar"
	PAKAD    = "pakad"
	MC       = "mc"
	CLASS    = "gang"
	NEW      = "naya"
	DOT      = "."
)

type Token struct {
	Type    TokenType
	Literal string
}

type Lexer struct {
	input        string
	position     int
	readPosition int
	ch           byte
}

func New(input string) *Lexer {
	l := &Lexer{input: input}
	l.readChar()
	return l
}

func (l *Lexer) readChar() {
	if l.readPosition >= len(l.input) {
		l.ch = 0
	} else {
		l.ch = l.input[l.readPosition]
	}
	l.position = l.readPosition
	l.readPosition++
}

func (l *Lexer) peekChar() byte {
	if l.readPosition >= len(l.input) {
		return 0
	}
	return l.input[l.readPosition]
}

func (l *Lexer) NextToken() Token {
	var tok Token

	l.skipWhitespace()

	switch l.ch {
	case '=':
		if l.peekChar() == '=' {
			ch := l.ch
			l.readChar()
			tok = Token{Type: EQ, Literal: string(ch) + string(l.ch)}
		} else {
			tok = newToken(ASSIGN, l.ch)
		}
	case '+':
		tok = newToken(PLUS, l.ch)
	case '-':
		tok = newToken(MINUS, l.ch)
	case '!':
		if l.peekChar() == '=' {
			ch := l.ch
			l.readChar()
			tok = Token{Type: NOT_EQ, Literal: string(ch) + string(l.ch)}
		} else {
			tok = newToken(BANG, l.ch)
		}
	case '*':
		tok = newToken(ASTERISK, l.ch)
	case '/':
		if l.peekChar() == '/' {
			l.skipComment()
			return l.NextToken()
		} else {
			tok = newToken(SLASH, l.ch)
		}
	case '<':
		tok = newToken(LT, l.ch)
	case '>':
		tok = newToken(GT, l.ch)
	case ',':
		tok = newToken(COMMA, l.ch)
	case ':':
		tok = newToken(COLON, l.ch)
	case '(':
		tok = newToken(LPAREN, l.ch)
	case ')':
		tok = newToken(RPAREN, l.ch)
	case '{':
		tok = newToken(LBRACE, l.ch)
	case '}':
		tok = newToken(RBRACE, l.ch)
	case '[':
		tok = newToken(LBRACKET, l.ch)
	case ']':
		tok = newToken(RBRACKET, l.ch)
	case '.':
		tok = newToken(DOT, l.ch)
	case '"':
		tok.Type = STRING
		tok.Literal = l.readString()
	case 0:
		tok.Literal = ""
		tok.Type = EOF
	default:
		if isLetter(l.ch) {
			tok.Literal = l.readIdentifier()
			tok.Type = lookupIdent(tok.Literal)
			return tok
		} else if isDigit(l.ch) {
			tok.Type = INT
			tok.Literal = l.readNumber()
			return tok
		} else {
			tok = newToken(ILLEGAL, l.ch)
		}
	}

	l.readChar()
	return tok
}

func (l *Lexer) readIdentifier() string {
	position := l.position
	for isLetter(l.ch) {
		l.readChar()
	}
	return l.input[position:l.position]
}

func (l *Lexer) readNumber() string {
	position := l.position
	for isDigit(l.ch) {
		l.readChar()
	}
	return l.input[position:l.position]
}

func (l *Lexer) readString() string {
	position := l.position + 1
	for {
		l.readChar()
		if l.ch == '"' || l.ch == 0 {
			break
		}
	}
	return l.input[position:l.position]
}

func (l *Lexer) skipWhitespace() {
	for l.ch == ' ' || l.ch == '\t' || l.ch == '\n' || l.ch == '\r' {
		l.readChar()
	}
}

func (l *Lexer) skipComment() {
	if l.ch == '/' && l.peekChar() == '/' {
		for l.ch != '\n' && l.ch != 0 {
			l.readChar()
		}
	}
}

func isLetter(ch byte) bool {
	return unicode.IsLetter(rune(ch)) || ch == '_'
}

func isDigit(ch byte) bool {
	return '0' <= ch && ch <= '9'
}

func newToken(tokenType TokenType, ch byte) Token {
	return Token{Type: tokenType, Literal: string(ch)}
}

func lookupIdent(ident string) TokenType {
	keywords := map[string]TokenType{
		"chutiye": VAR,
		"ye":      YE,
		"hai":     HAI,
		"bsdk":    IF,
		"agar":    AGAR,
		"kar":     KAR,
		"warna":   WARNA,
		"bhauk":   PRINT,
		"Suna":    INPUT,
		"lawde":   LAWDE,
		"kaand":   FUNCTION,
		"sahi":    TRUE,
		"bekaar":  FALSE,
		"jab":     LOOP,
		"tak":     TAK,
		"maa":     MAA,
		"na":      NA,
		"maane":   MAANE,
		"ruk":     BREAK,
		"jaa":     JAA,
		"bc":      BC,
		"aage":    CONTINUE,
		"baddh":   BADDH,
		"nikal":   EXIT,
		"mood":    SWITCH,
		"dekh":    CASE,
		"default": DEFAULT,
		"try":     TRY,
		"pakad":   PAKAD,
		"mc":      MC,
		"gang":    CLASS,
		"naya":    NEW,
	}

	if tok, ok := keywords[ident]; ok {
		return tok
	}
	return IDENT
}
