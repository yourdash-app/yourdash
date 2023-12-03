/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import KeyboardInputManager from "./keyboardManager";
import { CodeStudioFileTypes } from "./fileTypes";
import TreeSitterParser from "web-tree-sitter"
// @ts-ignore
import JAVASCRIPT_PARSER from "./languages/javascript.wasm?url"
// @ts-ignore
import TREESITTER_WASM from "./tree-sitter.wasm?url"

export default class CodeStudioEditor {
  keyboardInputManager: KeyboardInputManager;
  htmlContainer: HTMLDivElement;

  constructor( containerElement: HTMLDivElement ) {
    this.keyboardInputManager = new KeyboardInputManager();
    this.htmlContainer = containerElement;

    return this;
  }

  async loadRawCode( fileName: string, fileType: CodeStudioFileTypes, rawCode: string ) {
    await TreeSitterParser.init( { locateFile() {
      return TREESITTER_WASM
    } } )
    const parser = new TreeSitterParser();

    console.log( JAVASCRIPT_PARSER )

    parser.setLanguage( await TreeSitterParser.Language.load( JAVASCRIPT_PARSER ) );

    return this._debugRenderParsedString( rawCode, parser );
  }

  _debugRenderParsedString( string: string, parser: TreeSitterParser ) {
    this.htmlContainer.innerHTML = "<pre><code id=\"cs-text-output\"></code></pre>";

    return parser.parse( string )
  }
}
