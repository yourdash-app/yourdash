/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import CodeStudioBaseLanguageParser from "../../baseLanguageParser";
import Token from "../../token";
import { TokenType } from "../../tokenType";

// The YourDash CodeStudio language parser for "plainText" files.

class CodeStudioLanguageParser extends CodeStudioBaseLanguageParser {
  constructor() {
    super( "json" );
  }
  
  private tokenize( str: string ) {
    let outputString = str;
    const outputToken = new Token( "[YourDash CodeStudio ERROR] tokenization error", TokenType.Plain );
    
    outputString = "";
    outputToken.value = str;
    outputToken.type = TokenType.Plain;
    
    return {
      parsedToken: outputToken,
      remainingString: outputString
    };
  }
  
  private tokenizeString( str: string ) {
    const string = str;
    this.parsedTokens = [];
    
    if ( string.length === 0 ) {
      return;
    }
    
    let tokenizeOutput = this.tokenize( string );
    this.parsedTokens.push( tokenizeOutput.parsedToken );
    
    while ( tokenizeOutput.remainingString.length !== 0 ) {
      tokenizeOutput = this.tokenize( tokenizeOutput.remainingString );
      this.parsedTokens.push( tokenizeOutput.parsedToken );
    }
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
