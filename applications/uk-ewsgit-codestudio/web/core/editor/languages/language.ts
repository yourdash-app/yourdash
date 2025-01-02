/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Token, { TokenType } from "../token/token";
// @ts-ignore
import PLAINTEXT_TREESITTER_LANGUAGE from "./markdown/markdown.wasm?url";

export default class CodeStudioLanguage {
  tokens: { [key: string]: TokenType } = {};
  treesitterLanguage: string;

  constructor(treesitterLanguagePath: string) {
    this.treesitterLanguage = treesitterLanguagePath || PLAINTEXT_TREESITTER_LANGUAGE;

    return this;
  }

  parseFile(content: string): Token {
    return new Token(content, TokenType.OTHER, { col: 0, row: 0 });
  }
}
