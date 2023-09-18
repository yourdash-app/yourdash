/*
 * Copyright (c) 2023 YourDash contributors.
 * YourDash is licensed under the MIT License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import CodeStudioBaseLanguageParser from "../baseLanguageParser";
import Token from "../token";
import { TokenType } from "../tokenType";

// The YourDash CodeStudio language parser for the "JavaScript" language.

interface IJavaScriptScope {
    name: string | undefined;
    type: "function" | "variable";
    localScopes: IJavaScriptScope[];
}

class CodeStudioLanguageParser extends CodeStudioBaseLanguageParser {
  isInsideString: boolean;
  isSubProperty: boolean;
  isInsideSingleLineComment: boolean;
  globalScope: IJavaScriptScope;
  followingImportStatement: boolean;
  isFunctionName: boolean;
  
  constructor() {
    super( "javascript" );
    this.isSubProperty = false;
    this.isInsideString = false;
    this.globalScope = {
      name: "global",
      type: "variable",
      localScopes: []
    };
    this.isInsideSingleLineComment = false;
    this.followingImportStatement = false;
    this.isFunctionName = false;
  }
  
  private tokenize( str: string ): {
    parsedToken?: Token,
    remainingString: string
  } {
    let outputString = str;
    const outputToken = new Token( "[ERR] tokenERR", TokenType.Plain );
    
    switch ( true ) {
      case str.startsWith( "//" ):
        outputString = str.slice( 2 );
        outputToken.value = "// ";
        outputToken.type = TokenType.Comment;
        this.isInsideSingleLineComment = true;
        break;
      case this.isInsideSingleLineComment:
        if ( str.startsWith( "\n" ) ) {
          outputString = str.slice( 2 );
          outputToken.value = "\n";
          outputToken.type = TokenType.Comment;
          this.isInsideSingleLineComment = false;
        } else {
          outputString = str.slice( 1 );
          outputToken.value = str.slice( 0, 1 );
          outputToken.type = TokenType.Comment;
        }
        break;
      case str.startsWith( "\"" ):
      case str.startsWith( "\'" ):
        outputString = str.slice( 1 );
        outputToken.value = str.slice( 0, 1 );
        outputToken.type = TokenType.String;
        this.isInsideString = !this.isInsideString;
        break;
      case this.isInsideString:
        outputString = str.slice( 1 );
        outputToken.value = str.slice( 0, 1 );
        outputToken.type = TokenType.String;
        break;
      case this.isSubProperty:
        outputString = str.slice( 1 );
        outputToken.value = str.slice( 0, 1 );
        outputToken.type = TokenType.Identifier;
        break;
      case str.startsWith( "module" ):
        outputString = str.slice( 6 );
        outputToken.value = "module";
        outputToken.type = TokenType.Keyword;
        break;
      case str.startsWith( "export" ):
        outputString = str.slice( 6 );
        outputToken.value = "export";
        outputToken.type = TokenType.Keyword;
        break;
      case str.startsWith( "function" ):
        outputString = str.slice( 8 );
        outputToken.value = "function";
        outputToken.type = TokenType.Keyword;
        this.isFunctionName = true;
        break;
      case str.startsWith( "import" ):
        outputString = str.slice( 6 );
        outputToken.value = "import";
        outputToken.type = TokenType.Keyword;
        this.followingImportStatement = true;
        break;
      case str.startsWith( "abstract" ):
        outputString = str.slice( 8 );
        outputToken.value = "abstract";
        outputToken.type = TokenType.Keyword;
        break;
      case str.startsWith( "return" ):
        outputString = str.slice( 6 );
        outputToken.value = "return";
        outputToken.type = TokenType.Keyword;
        break;
      case str.startsWith( "yield" ):
        outputString = str.slice( 5 );
        outputToken.value = "yield";
        outputToken.type = TokenType.Keyword;
        break;
      case str.startsWith( "from" ) && this.followingImportStatement:
        outputString = str.slice( 4 );
        outputToken.value = "from";
        outputToken.type = TokenType.Keyword;
        this.followingImportStatement = false;
        break;
      case str.startsWith( "const" ):
        outputString = str.slice( 5 );
        outputToken.value = "const";
        outputToken.type = TokenType.Keyword;
        break;
      case str.startsWith( "class" ):
        outputString = str.slice( 5 );
        outputToken.value = "class";
        outputToken.type = TokenType.Keyword;
        break;
      case str.startsWith( "var" ):
        outputString = str.slice( 3 );
        outputToken.value = "var";
        outputToken.type = TokenType.Keyword;
        break;
      case str.startsWith( "let" ):
        outputString = str.slice( 3 );
        outputToken.value = "let";
        outputToken.type = TokenType.Keyword;
        break;
      case str.startsWith( "type" ):
        outputString = str.slice( 4 );
        outputToken.value = "type";
        outputToken.type = TokenType.Keyword;
        break;
      case str.startsWith( "console" ):
        outputString = str.slice( 7 );
        outputToken.value = "console";
        outputToken.type = TokenType.Identifier;
        break;
      case str.startsWith( "=>" ):
        outputString = str.slice( 2 );
        outputToken.value = "=>";
        outputToken.type = TokenType.Operator;
        outputToken.fontWeight = "700";
        break;
      case str.slice( 0, 1 ) === ".":
        outputString = str.slice( 1 );
        outputToken.value = ".";
        outputToken.type = TokenType.Punctuation;
        outputToken.fontWeight = "700";
        break;
      case str.slice( 0, 1 ) === ";":
        outputString = str.slice( 1 );
        outputToken.value = ";";
        outputToken.type = TokenType.Punctuation;
        outputToken.fontWeight = "700";
        break;
      case str.slice( 0, 1 ) === ":":
        outputString = str.slice( 1 );
        outputToken.value = ":";
        outputToken.type = TokenType.Punctuation;
        outputToken.fontWeight = "700";
        break;
      case str.slice( 0, 1 ) === "?":
        outputString = str.slice( 1 );
        outputToken.value = "?";
        outputToken.type = TokenType.Operator;
        outputToken.fontWeight = "700";
        break;
      case str.slice( 0, 1 ) === "|":
        outputString = str.slice( 1 );
        outputToken.value = "|";
        outputToken.type = TokenType.Operator;
        outputToken.fontWeight = "700";
        break;
      case str.slice( 0, 1 ) === ",":
        outputString = str.slice( 1 );
        outputToken.value = ",";
        outputToken.type = TokenType.Punctuation;
        outputToken.fontWeight = "700";
        break;
      case str.slice( 0, 1 ) === "=":
        outputString = str.slice( 1 );
        outputToken.value = "=";
        outputToken.type = TokenType.Operator;
        outputToken.fontWeight = "700";
        break;
      case str.slice( 0, 1 ) === "+":
        outputString = str.slice( 1 );
        outputToken.value = "+";
        outputToken.type = TokenType.Operator;
        outputToken.fontWeight = "700";
        break;
      case str.slice( 0, 1 ) === "-":
        outputString = str.slice( 1 );
        outputToken.value = "-";
        outputToken.type = TokenType.Operator;
        outputToken.fontWeight = "700";
        break;
      case str.slice( 0, 1 ) === "/":
        outputString = str.slice( 1 );
        outputToken.value = "/";
        outputToken.type = TokenType.Operator;
        outputToken.fontWeight = "700";
        break;
      case str.slice( 0, 1 ) === "*":
        outputString = str.slice( 1 );
        outputToken.value = "*";
        outputToken.type = TokenType.Operator;
        outputToken.fontWeight = "700";
        break;
      case str.slice( 0, 1 ) === "^":
        outputString = str.slice( 1 );
        outputToken.value = "^";
        outputToken.type = TokenType.Operator;
        outputToken.fontWeight = "700";
        break;
      case str.slice( 0, 1 ) === "&":
        outputString = str.slice( 1 );
        outputToken.value = "&";
        outputToken.type = TokenType.Operator;
        outputToken.fontWeight = "700";
        break;
      case str.slice( 0, 1 ) === "%":
        outputString = str.slice( 1 );
        outputToken.value = "%";
        outputToken.type = TokenType.Operator;
        outputToken.fontWeight = "700";
        break;
      case str.slice( 0, 1 ) === "$":
        outputString = str.slice( 1 );
        outputToken.value = "$";
        outputToken.type = TokenType.Punctuation;
        outputToken.fontWeight = "700";
        break;
      case str.slice( 0, 1 ) === "!":
        outputString = str.slice( 1 );
        outputToken.value = "!";
        outputToken.type = TokenType.Operator;
        outputToken.fontWeight = "700";
        break;
      case str.slice( 0, 1 ) === "(":
        outputString = str.slice( 1 );
        outputToken.value = "(";
        outputToken.type = TokenType.Punctuation;
        outputToken.fontWeight = "700";
        if ( this.isFunctionName ) {
          this.isFunctionName = false;
        }
        break;
      case this.isFunctionName:
        outputString = str.slice( 1 );
        outputToken.value = str.slice( 0, 1 );
        outputToken.type = TokenType.Identifier;
        break;
      case str.slice( 0, 1 ) === ")":
        outputString = str.slice( 1 );
        outputToken.value = ")";
        outputToken.type = TokenType.Punctuation;
        outputToken.fontWeight = "700";
        break;
      case str.slice( 0, 1 ) === "[":
        outputString = str.slice( 1 );
        outputToken.value = "[";
        outputToken.type = TokenType.Punctuation;
        outputToken.fontWeight = "700";
        break;
      case str.slice( 0, 1 ) === "]":
        outputString = str.slice( 1 );
        outputToken.value = "]";
        outputToken.type = TokenType.Punctuation;
        outputToken.fontWeight = "700";
        break;
      case str.slice( 0, 1 ) === "{":
        outputString = str.slice( 1 );
        outputToken.value = "{";
        outputToken.type = TokenType.Punctuation;
        outputToken.fontWeight = "700";
        break;
      case str.slice( 0, 1 ) === "}":
        outputString = str.slice( 1 );
        outputToken.value = "}";
        outputToken.type = TokenType.Punctuation;
        outputToken.fontWeight = "700";
        break;
      case str.slice( 0, 1 ) === "<":
        outputString = str.slice( 1 );
        outputToken.value = "<";
        outputToken.type = TokenType.Punctuation;
        outputToken.errorMessage = "Invalid character";
        outputToken.fontWeight = "700";
        break;
      case str.slice( 0, 1 ) === ">":
        outputString = str.slice( 1 );
        outputToken.value = ">";
        outputToken.type = TokenType.Punctuation;
        outputToken.errorMessage = "Invalid character";
        outputToken.fontWeight = "700";
        break;
      case str.slice( 0, 1 ) === " ":
        outputString = str.slice( 1 );
        outputToken.value = " ";
        outputToken.type = TokenType.Plain;
        break;
      case str.slice( 0, 1 ) === "\n":
        outputString = str.slice( 1 );
        outputToken.value = "\n";
        outputToken.type = TokenType.Plain;
        break;
      case str.slice( 0, 1 ) === "\t":
        outputString = str.slice( 1 );
        outputToken.value = "\t";
        outputToken.type = TokenType.Plain;
        break;
      case str.slice( 0, 1 ) === "0":
      case str.slice( 0, 1 ) === "1":
      case str.slice( 0, 1 ) === "2":
      case str.slice( 0, 1 ) === "3":
      case str.slice( 0, 1 ) === "4":
      case str.slice( 0, 1 ) === "5":
      case str.slice( 0, 1 ) === "6":
      case str.slice( 0, 1 ) === "7":
      case str.slice( 0, 1 ) === "8":
      case str.slice( 0, 1 ) === "9":
        outputString = str.slice( 1 );
        outputToken.value = str.slice( 0, 1 );
        outputToken.type = TokenType.Number;
        break;
      default:
        outputString = str.slice( 1 );
        outputToken.value = str.slice( 0, 1 );
        outputToken.type = TokenType.Plain;
    }
    
    return {
      parsedToken: outputToken,
      remainingString: outputString
    };
  }
  
  private mergeTokens() {
    let didMatch = false;
    
    console.log( `Merging ${ this.parsedTokens.length } tokens.` );
    
    this.parsedTokens.map( ( token, ind ) => {
      if ( !this.parsedTokens[ind + 1] ) {
        return "";
      }
      
      if (
        (
          this.parsedTokens[ind + 1].type === token.type &&
          this.parsedTokens[ind + 1].fontWeight === token.fontWeight &&
          !this.parsedTokens[ind].errorMessage
        ) ||
        this.parsedTokens[ind + 1].value === " " ||
        this.parsedTokens[ind + 1].value === "\t" ||
        this.parsedTokens[ind + 1].value === "\n"
      ) {
        token.value += this.parsedTokens[ind + 1].value;
        this.parsedTokens.splice( ind + 1, 1 );
        didMatch = true;
      }
      
      return "";
    } );
    
    if ( didMatch ) {
      this.mergeTokens();
    }
  }
  
  private tokenizeString( str: string ) {
    const string = str;
    this.parsedTokens = [];
    
    if ( string.length === 0 ) {
      return;
    }
    
    let tokenizeOutput = this.tokenize( string );
    if ( tokenizeOutput.parsedToken ) {
      this.parsedTokens.push( tokenizeOutput.parsedToken );
    }
    
    while ( tokenizeOutput.remainingString.length !== 0 ) {
      tokenizeOutput = this.tokenize( tokenizeOutput.remainingString );
      
      if ( tokenizeOutput.parsedToken ) {
        this.parsedTokens.push( tokenizeOutput.parsedToken );
      }
    }
    
    console.log( this.parsedTokens );
    
    this.mergeTokens();
  }
  
  parseString( str: string ) {
    super.parseString( str );
    
    this.tokenizeString( str );
    
    return this;
  }
}

const parser = new CodeStudioLanguageParser();

onmessage = e => {
  postMessage( { tokens: parser.parseString( e.data.str ) } );
};
