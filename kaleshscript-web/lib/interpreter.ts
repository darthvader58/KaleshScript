// KaleshScript Interpreter for Web - Complete Implementation

type TokenType = string;

interface Token {
  type: TokenType;
  literal: string;
}

class Lexer {
  private input: string;
  private position: number = 0;
  private readPosition: number = 0;
  private ch: string = '';

  constructor(input: string) {
    this.input = input;
    this.readChar();
  }

  private readChar() {
    if (this.readPosition >= this.input.length) {
      this.ch = '';
    } else {
      this.ch = this.input[this.readPosition];
    }
    this.position = this.readPosition;
    this.readPosition++;
  }

  private peekChar(): string {
    if (this.readPosition >= this.input.length) {
      return '';
    }
    return this.input[this.readPosition];
  }

  private skipWhitespace() {
    while (this.ch === ' ' || this.ch === '\t' || this.ch === '\n' || this.ch === '\r') {
      this.readChar();
    }
  }

  private skipComment() {
    if (this.ch === '/' && this.peekChar() === '/') {
      while (this.ch !== '\n' && this.ch !== '') {
        this.readChar();
      }
    }
  }

  private readIdentifier(): string {
    const position = this.position;
    while (this.isLetter(this.ch)) {
      this.readChar();
    }
    return this.input.substring(position, this.position);
  }

  private readNumber(): string {
    const position = this.position;
    while (this.isDigit(this.ch)) {
      this.readChar();
    }
    return this.input.substring(position, this.position);
  }

  private readString(): string {
    const position = this.position + 1;
    while (true) {
      this.readChar();
      if (this.ch === '"' || this.ch === '') {
        break;
      }
    }
    return this.input.substring(position, this.position);
  }

  private isLetter(ch: string): boolean {
    return /[a-zA-Z_]/.test(ch);
  }

  private isDigit(ch: string): boolean {
    return /[0-9]/.test(ch);
  }

  private lookupIdent(ident: string): TokenType {
    const keywords: { [key: string]: TokenType } = {
      'chutiye': 'VAR',
      'ye': 'YE',
      'hai': 'HAI',
      'bsdk': 'IF',
      'agar': 'AGAR',
      'kar': 'KAR',
      'warna': 'WARNA',
      'bhauk': 'PRINT',
      'Suna': 'INPUT',
      'lawde': 'LAWDE',
      'kaand': 'FUNCTION',
      'sahi': 'TRUE',
      'bekaar': 'FALSE',
      'jab': 'LOOP',
      'tak': 'TAK',
      'maa': 'MAA',
      'na': 'NA',
      'maane': 'MAANE',
      'ruk': 'BREAK',
      'jaa': 'JAA',
      'bc': 'BC',
      'aage': 'CONTINUE',
      'baddh': 'BADDH',
      'nikal': 'EXIT',
      'mood': 'SWITCH',
      'dekh': 'DEKH',
      'case': 'CASE',
      'default': 'DEFAULT',
      'try': 'TRY',
      'pakad': 'PAKAD',
      'mc': 'MC',
      'gang': 'CLASS',
      'naya': 'NEW',
    };
    return keywords[ident] || 'IDENT';
  }

  nextToken(): Token {
    let tok: Token;

    this.skipWhitespace();

    switch (this.ch) {
      case '=':
        if (this.peekChar() === '=') {
          const ch = this.ch;
          this.readChar();
          tok = { type: 'EQ', literal: ch + this.ch };
        } else {
          tok = { type: 'ASSIGN', literal: this.ch };
        }
        break;
      case '+':
        tok = { type: 'PLUS', literal: this.ch };
        break;
      case '-':
        tok = { type: 'MINUS', literal: this.ch };
        break;
      case '!':
        if (this.peekChar() === '=') {
          const ch = this.ch;
          this.readChar();
          tok = { type: 'NOT_EQ', literal: ch + this.ch };
        } else {
          tok = { type: 'BANG', literal: this.ch };
        }
        break;
      case '*':
        tok = { type: 'ASTERISK', literal: this.ch };
        break;
      case '/':
        if (this.peekChar() === '/') {
          this.skipComment();
          return this.nextToken();
        } else {
          tok = { type: 'SLASH', literal: this.ch };
        }
        break;
      case '<':
        tok = { type: 'LT', literal: this.ch };
        break;
      case '>':
        tok = { type: 'GT', literal: this.ch };
        break;
      case ',':
        tok = { type: 'COMMA', literal: this.ch };
        break;
      case ':':
        tok = { type: 'COLON', literal: this.ch };
        break;
      case '(':
        tok = { type: 'LPAREN', literal: this.ch };
        break;
      case ')':
        tok = { type: 'RPAREN', literal: this.ch };
        break;
      case '{':
        tok = { type: 'LBRACE', literal: this.ch };
        break;
      case '}':
        tok = { type: 'RBRACE', literal: this.ch };
        break;
      case '[':
        tok = { type: 'LBRACKET', literal: this.ch };
        break;
      case ']':
        tok = { type: 'RBRACKET', literal: this.ch };
        break;
      case '.':
        tok = { type: 'DOT', literal: this.ch };
        break;
      case '"':
        tok = { type: 'STRING', literal: this.readString() };
        break;
      case '':
        tok = { type: 'EOF', literal: '' };
        break;
      default:
        if (this.isLetter(this.ch)) {
          const literal = this.readIdentifier();
          return { type: this.lookupIdent(literal), literal };
        } else if (this.isDigit(this.ch)) {
          return { type: 'INT', literal: this.readNumber() };
        } else {
          tok = { type: 'ILLEGAL', literal: this.ch };
        }
    }

    this.readChar();
    return tok;
  }
}

interface Environment {
  [key: string]: any;
}

interface FunctionDef {
  params: string[];
  body: Token[];
}

export class KaleshScriptInterpreter {
  private env: Environment = {};
  private output: string[] = [];
  private functions: { [key: string]: FunctionDef } = {};
  private shouldExit: boolean = false;
  private shouldBreak: boolean = false;
  private shouldContinue: boolean = false;
  private maxLoopIterations: number = 10000; // Prevent infinite loops

  execute(code: string): { output: string; error?: string } {
    this.output = [];
    this.env = {};
    this.functions = {};
    this.shouldExit = false;

    try {
      const lexer = new Lexer(code);
      const tokens: Token[] = [];
      
      let tok = lexer.nextToken();
      while (tok.type !== 'EOF') {
        tokens.push(tok);
        tok = lexer.nextToken();
      }

      // Check if program has exit statement BEFORE running
      let hasValidExit = false;
      for (let i = 0; i < tokens.length; i++) {
        if (tokens[i].type === 'EXIT') {
          // Check if next token is LAWDE
          if (tokens[i + 1]?.type === 'LAWDE') {
            hasValidExit = true;
            break;
          }
        }
      }
      
      if (!hasValidExit) {
        return {
          output: '',
          error: 'Ye kya bakchodi likh di? Program must end with "nikal lawde"'
        };
      }

      this.executeTokens(tokens);
      
      return { output: this.output.join('\n') };
    } catch (error: any) {
      return { 
        output: this.output.join('\n'), 
        error: `Lafda ho gaya: ${error.message}` 
      };
    }
  }

  private executeTokens(tokens: Token[], startIndex: number = 0, endIndex?: number) {
    let i = startIndex;
    const end = endIndex ?? tokens.length;

    while (i < end && !this.shouldExit) {
      if (this.shouldBreak || this.shouldContinue) break;
      
      const tok = tokens[i];

      // Exit: nikal lawde
      if (tok.type === 'EXIT') {
        i++;
        // Must be followed by "lawde"
        if (tokens[i]?.type !== 'LAWDE') {
          throw new Error('Ye kya bakchodi likh di? "nikal" must be followed by "lawde"');
        }
        this.shouldExit = true;
        return;
      }

      // Variable declaration: chutiye ye x hai value
      if (tok.type === 'VAR') {
        i++;
        if (tokens[i]?.type !== 'YE') throw new Error('Ye kya bakchodi likh di? Expected "ye"');
        i++;
        const name = tokens[i]?.literal;
        if (!name) throw new Error('Ye kya bakchodi likh di? Expected variable name');
        i++;
        if (tokens[i]?.type !== 'HAI') throw new Error('Ye kya bakchodi likh di? Expected "hai"');
        i++;
        const value = this.evaluateExpression(tokens, i);
        this.env[name] = value.value;
        i = value.nextIndex;
        continue;
      }

      // Print: bhauk value
      if (tok.type === 'PRINT') {
        i++;
        const result = this.evaluateExpression(tokens, i);
        this.output.push(String(result.value));
        i = result.nextIndex;
        continue;
      }

      // Function definition: kaand name(params) { body }
      if (tok.type === 'FUNCTION') {
        i++;
        const funcName = tokens[i]?.literal;
        if (!funcName) throw new Error('Expected function name');
        i++;
        if (tokens[i]?.type !== 'LPAREN') throw new Error('Expected "("');
        i++;
        
        const params: string[] = [];
        while (tokens[i]?.type !== 'RPAREN') {
          if (tokens[i]?.type === 'IDENT') {
            params.push(tokens[i].literal);
          }
          i++;
          if (tokens[i]?.type === 'COMMA') i++;
        }
        i++; // skip )
        
        if (tokens[i]?.type !== 'LBRACE') throw new Error('Expected "{"');
        i++;
        
        const bodyStart = i;
        let braceCount = 1;
        while (braceCount > 0 && i < tokens.length) {
          if (tokens[i].type === 'LBRACE') braceCount++;
          if (tokens[i].type === 'RBRACE') braceCount--;
          i++;
        }
        
        this.functions[funcName] = {
          params,
          body: tokens.slice(bodyStart, i - 1)
        };
        continue;
      }

      // Loop: jab tak maa condition na maane: body
      if (tok.type === 'LOOP') {
        i++;
        if (tokens[i]?.type === 'TAK') i++;
        if (tokens[i]?.type === 'MAA') i++;
        
        const condStart = i;
        while (tokens[i] && tokens[i].type !== 'NA' && tokens[i].type !== 'MAANE' && tokens[i].type !== 'COLON') {
          i++;
        }
        const condEnd = i;
        
        if (tokens[i]?.type === 'NA') i++;
        if (tokens[i]?.type === 'MAANE') i++;
        if (tokens[i]?.type !== 'COLON') throw new Error('Expected ":"');
        i++;
        
        const bodyStart = i;
        const bodyEnd = this.findStatementEnd(tokens, i);
        
        let iterations = 0;
        while (true) {
          iterations++;
          
          // Check for infinite loop
          if (iterations > this.maxLoopIterations) {
            throw new Error('Lafda ho gaya: Infinite loop detected! Loop ran more than ' + this.maxLoopIterations + ' times. Use "ruk jaa bc" to break the loop.');
          }
          
          const condResult = this.evaluateExpression(tokens, condStart, condEnd);
          if (!condResult.value) break;
          
          this.shouldBreak = false;
          this.shouldContinue = false;
          this.executeTokens(tokens, bodyStart, bodyEnd);
          
          if (this.shouldBreak) {
            this.shouldBreak = false;
            break;
          }
        }
        
        i = bodyEnd;
        continue;
      }

      // Break: ruk jaa bc
      if (tok.type === 'BREAK') {
        this.shouldBreak = true;
        i++;
        if (tokens[i]?.type === 'JAA') i++;
        if (tokens[i]?.type === 'BC') i++;
        return;
      }

      // Continue: aage baddh bc
      if (tok.type === 'CONTINUE') {
        this.shouldContinue = true;
        i++;
        if (tokens[i]?.type === 'BADDH') i++;
        if (tokens[i]?.type === 'BC') i++;
        return;
      }

      // Switch: mood value { case ... }
      if (tok.type === 'SWITCH') {
        i++;
        if (tokens[i]?.type === 'DEKH') i++;
        
        const switchValue = this.evaluateExpression(tokens, i);
        i = switchValue.nextIndex;
        
        if (tokens[i]?.type !== 'LBRACE') throw new Error('Expected "{"');
        i++;
        
        let matched = false;
        while (tokens[i]?.type !== 'RBRACE' && i < tokens.length) {
          if (tokens[i].type === 'CASE') {
            i++;
            const caseValue = this.evaluateExpression(tokens, i);
            i = caseValue.nextIndex;
            
            if (tokens[i]?.type !== 'COLON') throw new Error('Expected ":"');
            i++;
            
            if (!matched && switchValue.value === caseValue.value) {
              matched = true;
              const stmtEnd = this.findStatementEnd(tokens, i);
              this.executeTokens(tokens, i, stmtEnd);
              i = stmtEnd;
            } else {
              i = this.findStatementEnd(tokens, i);
            }
          } else if (tokens[i].type === 'DEFAULT') {
            i++;
            if (tokens[i]?.type !== 'COLON') throw new Error('Expected ":"');
            i++;
            
            if (!matched) {
              const stmtEnd = this.findStatementEnd(tokens, i);
              this.executeTokens(tokens, i, stmtEnd);
              i = stmtEnd;
            } else {
              i = this.findStatementEnd(tokens, i);
            }
          } else {
            i++;
          }
        }
        
        if (tokens[i]?.type === 'RBRACE') i++;
        continue;
      }

      // Try-catch: try kar: body , pakad mc: catchBody
      if (tok.type === 'TRY') {
        i++;
        if (tokens[i]?.type === 'KAR') i++;
        if (tokens[i]?.type !== 'COLON') throw new Error('Expected ":"');
        i++;
        
        const tryStart = i;
        const tryEnd = this.findStatementEnd(tokens, i);
        
        try {
          this.executeTokens(tokens, tryStart, tryEnd);
        } catch (e) {
          // Find catch block
          i = tryEnd;
          if (tokens[i]?.type === 'COMMA') i++;
          if (tokens[i]?.type !== 'PAKAD') throw new Error('Expected "pakad"');
          i++;
          if (tokens[i]?.type === 'MC') i++;
          if (tokens[i]?.type !== 'COLON') throw new Error('Expected ":"');
          i++;
          
          const catchEnd = this.findStatementEnd(tokens, i);
          this.executeTokens(tokens, i, catchEnd);
          i = catchEnd;
          continue;
        }
        
        i = tryEnd;
        // Skip catch block
        if (tokens[i]?.type === 'COMMA') i++;
        if (tokens[i]?.type === 'PAKAD') {
          i++;
          if (tokens[i]?.type === 'MC') i++;
          if (tokens[i]?.type === 'COLON') i++;
          i = this.findStatementEnd(tokens, i);
        }
        continue;
      }

      // If statement: bsdk agar condition kar: statement
      if (tok.type === 'IF') {
        i++;
        if (tokens[i]?.type === 'AGAR') i++;
        
        const condition = this.evaluateExpression(tokens, i);
        i = condition.nextIndex;
        
        if (tokens[i]?.type === 'KAR') i++;
        if (tokens[i]?.type !== 'COLON') throw new Error('Expected ":"');
        i++;
        
        const stmtEnd = this.findStatementEnd(tokens, i);
        
        if (condition.value) {
          this.executeTokens(tokens, i, stmtEnd);
        }
        
        i = stmtEnd;
        
        // Check for warna (else)
        if (tokens[i]?.type === 'WARNA') {
          i++;
          if (tokens[i]?.type !== 'COLON') throw new Error('Expected ":"');
          i++;
          
          const elseEnd = this.findStatementEnd(tokens, i);
          
          if (!condition.value) {
            this.executeTokens(tokens, i, elseEnd);
          }
          
          i = elseEnd;
        }
        continue;
      }

      // Assignment or function call
      if (tok.type === 'IDENT') {
        if (tokens[i + 1]?.type === 'ASSIGN') {
          const name = tok.literal;
          i += 2;
          const value = this.evaluateExpression(tokens, i);
          this.env[name] = value.value;
          i = value.nextIndex;
          continue;
        } else if (tokens[i + 1]?.type === 'LPAREN') {
          // Function call
          const result = this.evaluateExpression(tokens, i);
          i = result.nextIndex;
          continue;
        }
      }

      i++;
    }
  }

  private findStatementEnd(tokens: Token[], start: number): number {
    let i = start;
    let depth = 0;
    
    while (i < tokens.length) {
      if (tokens[i].type === 'LBRACE') depth++;
      if (tokens[i].type === 'RBRACE') {
        if (depth === 0) return i;
        depth--;
      }
      
      if (depth === 0) {
        if (tokens[i].type === 'VAR' || tokens[i].type === 'IF' || 
            tokens[i].type === 'PRINT' || tokens[i].type === 'LOOP' ||
            tokens[i].type === 'SWITCH' || tokens[i].type === 'TRY' ||
            tokens[i].type === 'FUNCTION' || tokens[i].type === 'WARNA' ||
            tokens[i].type === 'CASE' || tokens[i].type === 'DEFAULT' ||
            tokens[i].type === 'COMMA' || tokens[i].type === 'PAKAD') {
          return i;
        }
      }
      
      i++;
    }
    return i;
  }

  private evaluateExpression(tokens: Token[], startIndex: number, endIndex?: number): { value: any; nextIndex: number } {
    let i = startIndex;
    const end = endIndex ?? tokens.length;
    const tok = tokens[i];

    if (!tok || i >= end) throw new Error('Unexpected end of expression');

    // Input: Suna lawde()
    if (tok.type === 'INPUT') {
      i++;
      if (tokens[i]?.type !== 'LAWDE') throw new Error('Expected "lawde"');
      i++;
      if (tokens[i]?.type !== 'LPAREN') throw new Error('Expected "("');
      i++;
      if (tokens[i]?.type !== 'RPAREN') throw new Error('Expected ")"');
      i++;
      return { value: prompt('Input:') || '', nextIndex: i };
    }

    // Integer
    if (tok.type === 'INT') {
      return { value: parseInt(tok.literal), nextIndex: i + 1 };
    }

    // String
    if (tok.type === 'STRING') {
      return { value: tok.literal, nextIndex: i + 1 };
    }

    // Boolean
    if (tok.type === 'TRUE') {
      return { value: true, nextIndex: i + 1 };
    }
    if (tok.type === 'FALSE') {
      return { value: false, nextIndex: i + 1 };
    }

    // Array
    if (tok.type === 'LBRACKET') {
      const elements: any[] = [];
      i++;
      while (tokens[i]?.type !== 'RBRACKET' && i < end) {
        const elem = this.evaluateExpression(tokens, i, end);
        elements.push(elem.value);
        i = elem.nextIndex;
        if (tokens[i]?.type === 'COMMA') i++;
      }
      return { value: elements, nextIndex: i + 1 };
    }

    // Hash
    if (tok.type === 'LBRACE') {
      const hash: any = {};
      i++;
      while (tokens[i]?.type !== 'RBRACE' && i < end) {
        const key = this.evaluateExpression(tokens, i, end);
        i = key.nextIndex;
        if (tokens[i]?.type !== 'COLON') throw new Error('Expected ":"');
        i++;
        const value = this.evaluateExpression(tokens, i, end);
        hash[key.value] = value.value;
        i = value.nextIndex;
        if (tokens[i]?.type === 'COMMA') i++;
      }
      return { value: hash, nextIndex: i + 1 };
    }

    // Identifier, function call, or array/hash access
    if (tok.type === 'IDENT') {
      // Check for function call
      if (tokens[i + 1]?.type === 'LPAREN') {
        const funcName = tok.literal;
        const func = this.functions[funcName];
        if (!func) throw new Error(`Function not found: ${funcName}`);
        
        i += 2; // skip name and (
        const args: any[] = [];
        while (tokens[i]?.type !== 'RPAREN' && i < end) {
          const arg = this.evaluateExpression(tokens, i, end);
          args.push(arg.value);
          i = arg.nextIndex;
          if (tokens[i]?.type === 'COMMA') i++;
        }
        i++; // skip )
        
        // Execute function
        const savedEnv = { ...this.env };
        func.params.forEach((param, idx) => {
          this.env[param] = args[idx];
        });
        this.executeTokens(func.body);
        this.env = savedEnv;
        
        return { value: null, nextIndex: i };
      }
      
      let value = this.env[tok.literal];
      if (value === undefined) throw new Error(`Khali dimaag: ${tok.literal} not found`);
      i++;

      // Array/hash indexing
      if (tokens[i]?.type === 'LBRACKET') {
        i++;
        const index = this.evaluateExpression(tokens, i, end);
        i = index.nextIndex;
        if (tokens[i]?.type !== 'RBRACKET') throw new Error('Expected "]"');
        i++;
        value = value[index.value];
      }

      // Check for binary operation
      if (tokens[i] && i < end && this.isBinaryOp(tokens[i].type)) {
        const op = tokens[i].type;
        i++;
        const right = this.evaluateExpression(tokens, i, end);
        value = this.applyBinaryOp(value, op, right.value);
        i = right.nextIndex;
      }

      return { value, nextIndex: i };
    }

    throw new Error(`Dimag use kar thoda: Unexpected token ${tok.type}`);
  }

  private isBinaryOp(type: TokenType): boolean {
    return ['PLUS', 'MINUS', 'ASTERISK', 'SLASH', 'EQ', 'NOT_EQ', 'LT', 'GT'].includes(type);
  }

  private applyBinaryOp(left: any, op: TokenType, right: any): any {
    switch (op) {
      case 'PLUS':
        // Allow string concatenation or number addition
        if (typeof left === 'string' || typeof right === 'string') {
          return String(left) + String(right);
        }
        if (typeof left === 'number' && typeof right === 'number') {
          return left + right;
        }
        throw new Error('Dimag use kar thoda: Cannot add ' + typeof left + ' and ' + typeof right);
        
      case 'MINUS':
        if (typeof left !== 'number' || typeof right !== 'number') {
          throw new Error('Dimag use kar thoda: Cannot subtract ' + typeof right + ' from ' + typeof left);
        }
        return left - right;
        
      case 'ASTERISK':
        if (typeof left !== 'number' || typeof right !== 'number') {
          throw new Error('Dimag use kar thoda: Cannot multiply ' + typeof left + ' and ' + typeof right);
        }
        return left * right;
        
      case 'SLASH':
        if (typeof left !== 'number' || typeof right !== 'number') {
          throw new Error('Dimag use kar thoda: Cannot divide ' + typeof left + ' by ' + typeof right);
        }
        if (right === 0) {
          throw new Error('Dimag use kar thoda: Cannot divide by zero');
        }
        return left / right;
        
      case 'EQ':
        return left === right;
        
      case 'NOT_EQ':
        return left !== right;
        
      case 'LT':
        if (typeof left !== 'number' || typeof right !== 'number') {
          throw new Error('Dimag use kar thoda: Cannot compare ' + typeof left + ' and ' + typeof right);
        }
        return left < right;
        
      case 'GT':
        if (typeof left !== 'number' || typeof right !== 'number') {
          throw new Error('Dimag use kar thoda: Cannot compare ' + typeof left + ' and ' + typeof right);
        }
        return left > right;
        
      default:
        throw new Error(`Unknown operator: ${op}`);
    }
  }
}
