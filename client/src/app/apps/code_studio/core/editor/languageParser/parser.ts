import Token from "./token";
import { getParserForLanguage } from "./parserLookup";

export default class CodeStudioLanguageParser {
  language: string;
  private onParseListener?: ( parsedTokens: Token[] ) => void;
  private worker: Worker;
  
  constructor( language: string ) {
    this.language = language;
    
    this.worker = new Worker(
      new URL( getParserForLanguage( language ), import.meta.url ),
      { type: "module" }
    );
    
    this.worker.onmessage = event => {
      this.onParseListener?.( event.data.tokens.parsedTokens );
    };
  }
  
  onParse( cb: ( parsedTokens: Token[] ) => void ) {
    this.onParseListener = cb;
  }
  
  parseString( str: string ) {
    this.worker.postMessage( {
      str
    } );
    
    return this;
  }
  
  parseLine( lineNumber: number, line: string ) {
    return this;
  }
}
