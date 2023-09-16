/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import CodeStudioBaseLanguageParser from "../baseLanguageParser";
import Token from "../token";
import { TokenType } from "../tokenType";

// The YourDash CodeStudio language parser for the "JSON" language.

class CodeStudioLanguageParser extends CodeStudioBaseLanguageParser {
  isInsideString: boolean;
  isSubProperty: boolean;
  
  constructor() {
    super( "json" );
    this.isSubProperty = false;
    this.isInsideString = false;
  }
  
  private tokenize( str: string ) {
    let outputString = str;
    const outputToken = new Token( "[YourDash CodeStudio ERROR] tokenization error", TokenType.Plain );
    
    switch ( true ) {
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
          this.parsedTokens[ind + 1].fontWeight === token.fontWeight
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
    
    if ( string.length === 0 ) {
      return;
    }
    
    let tokenizeOutput = this.tokenize( string );
    this.parsedTokens.push( tokenizeOutput.parsedToken );
    
    while ( tokenizeOutput.remainingString.length !== 0 ) {
      tokenizeOutput = this.tokenize( tokenizeOutput.remainingString );
      this.parsedTokens.push( tokenizeOutput.parsedToken );
    }
    
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
