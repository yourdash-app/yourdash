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
    this.htmlContainer.innerHTML = "<pre><code id=\"cs-text-output\"></code></pre>";
    
    if ( document.getElementById( "cs-text-output" ) ) {
      // @ts-ignore
      document.getElementById( "cs-text-output" ).style.fontFamily = "Jetbrains Mono, JetbrainsMono Nerd Font, Fira Code, Source Code Pro, monospace"
      
      const LINES_TO_PARSE = 4
      const STARTING_LINE = 0
      
      const lines = string.split( "\n" );
      
      parser.onParse( tokens => {
        if ( this.debugMode ) {
          console.log( tokens );
          console.log( `Token count: ${ tokens.length }` );
        }
        
        renderTokens(
          document.getElementById( "cs-text-output" ) as HTMLDivElement,
          tokens
        );
      } );
      
      // @ts-ignore
      document.getElementById( "cs-text-output" ).innerHTML = string;
        
      parser.parseString( lines.slice( STARTING_LINE, LINES_TO_PARSE ).join( "\n" ) );
    }
  }
}
