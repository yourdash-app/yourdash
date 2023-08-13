import KeyboardInputManager from "./keyboardManager";
import { CodeStudioFileTypes } from "./fileTypes";
import CodeStudioLanguageParser from "./languageParser/parser";
import renderTokens from "./languageParser/renderTokens";

export default class CodeStudioEditor {
  keyboardInputManager: KeyboardInputManager;
  htmlContainer: HTMLDivElement;
  debugMode?: boolean;
  
  constructor( containerElement: HTMLDivElement ) {
    this.keyboardInputManager = new KeyboardInputManager();
    this.htmlContainer = containerElement;
    
    return this;
  }
  
  // TODO: implement ME
  loadRawCode( fileName: string, fileType: CodeStudioFileTypes, rawCode: string ) {
    this._debugRenderParsedString( rawCode, new CodeStudioLanguageParser( "javascript" ) );
    return;
  }
  
  _debugRenderParsedString( string: string, parser: CodeStudioLanguageParser ) {
    this.htmlContainer.innerHTML = "<pre><code id=\"cs-test-output\" style=\"font-family:'Jetbrains Mono'\"></code></pre>";
    
    if ( document.getElementById( "cs-test-output" ) ) {
      const placeholderParser = new CodeStudioLanguageParser( "plainText" );
      placeholderParser.parseString( string );
      placeholderParser.onParse( tokens => {
        renderTokens( document.getElementById( "cs-test-output" ) as HTMLDivElement, tokens );
      } );
      parser.onParse( tokens => {
        if ( this.debugMode ) {
          console.log( tokens );
          console.log( `Token count: ${ tokens.length }` );
        }
        renderTokens( document.getElementById( "cs-test-output" ) as HTMLDivElement, tokens );
      } );
      
      parser.parseString( string );
    }
  }
}
