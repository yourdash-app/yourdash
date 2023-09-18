/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Token from "./token";

export default class CodeStudioBaseLanguageParser {
  language: string;
  parsedTokens: Token[];
  
  constructor( language: string ) {
    this.language = language;
    this.parsedTokens = [];
  }
  
  parseString( str: string ) {
    return this;
  }
  
  parseLine( lineNumber: number, line: string ) {
    return this;
  }
}
