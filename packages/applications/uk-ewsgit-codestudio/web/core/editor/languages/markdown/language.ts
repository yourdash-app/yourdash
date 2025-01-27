/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { TokenType } from "../../token/token";
import CodeStudioLanguage from "../language";
// @ts-ignore
import MARKDOWN_TREESITTER_LANGUAGE from "./markdown.wasm?url";

export default class CodeStudioLanguageMarkdown extends CodeStudioLanguage {
  constructor() {
    super(MARKDOWN_TREESITTER_LANGUAGE);

    this.tokens = {
      text: TokenType.OTHER,
      html_tag_name: TokenType.XML_TAG,
      soft_line_break: TokenType.OTHER,
      html_attribute_key: TokenType.XML_ATTRIBUTE_KEY,
      html_attribute_value: TokenType.XML_ATTRIBUTE_VALUE,
    };

    return this;
  }
}
