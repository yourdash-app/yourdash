/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { TokenType } from "../../token/token";
import CodeStudioLanguage from "../language";
// @ts-ignore
import MARKDOWN_TREESITTER_LANGUAGE from "./markdown/markdown.wasm?url";

export default class CodeStudioLanguageMarkdown extends CodeStudioLanguage {
  constructor() {
    super(MARKDOWN_TREESITTER_LANGUAGE);

    this.tokens = {
      text: TokenType.OTHER,
    };

    return this;
  }
}
