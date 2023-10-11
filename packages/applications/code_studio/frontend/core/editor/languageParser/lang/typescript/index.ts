/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import CodeStudioBaseLanguageParser from "../../baseLanguageParser";
import Token from "../../token";
import { TokenType } from "../../tokenType";

// The YourDash CodeStudio language parser for the "TypeScript" language.

class CodeStudioLanguageParser extends CodeStudioBaseLanguageParser {
  isInsideString: boolean;
  isSubProperty: boolean;
  isInsideSingleLineComment: boolean;
  globalScope: TsGlobalScope;
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
    const outputToken = new Token( "[YourDash CodeStudio ERROR] tokenization error", TokenType.Plain );
    const outputString = str;
    
    
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
    } else {
      console.log( "Token merge complete!" )
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
  console.log( parser.parseString( e.data.str ) )
  postMessage( { tokens: parser.parseString( e.data.str ) } );
};
