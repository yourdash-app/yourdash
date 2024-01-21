/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import TreeSitterParser from "web-tree-sitter";
import PLAINTEXT_TREESITTER_LANGUAGE from "web-tree-sitter/lib/languages/plaintext/plaintext.wasm?url";

export default class CodeStudioLanguage {
  tokens: { [key: string]: { italic: boolean; bold: boolean; color: string } } =
    {};
  treesitterLanguage: TreeSitterParser.Language = PLAINTEXT_TREESITTER_LANGUAGE;

  constructor() {
    return this;
  }

  parseFile() {
    const languageTokenTheme = {};

    return {
      content: "",
      style: {
        italic: false,
        bold: false,
        color: "",
      },
    };
  }
}
