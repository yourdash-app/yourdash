/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import TreeSitterParser from "web-tree-sitter";
import PLAINTEXT_TREESITTER_LANGUAGE from "web-tree-sitter/lib/languages/plaintext/plaintext.wasm?url";

import TreeSitterParser from "web-tree-sitter";

export default class CodeStudioLanguage {
  tokens: Map<string, { italic: boolean; bold: boolean; color: string }> =
    new Map();
  treesitterLanguage: TreeSitterParser.Language = PLAINTEXT_TREESITTER_LANGUAGE;

  constructor() {
    return this;
  }

  syntaxNodeToRenderableToken(syntaxNode: TreeSitterParser.SyntaxNode) {
    return {
      content: syntaxNode.text,
      style: {
        italic: this.tokens.get(syntaxNode.type)?.italic || false,
        bold: this.tokens.get(syntaxNode.type)?.bold || false,
        color: this.tokens.get(syntaxNode.type)?.color || "#00ff00",
      },
    };
  }
}
