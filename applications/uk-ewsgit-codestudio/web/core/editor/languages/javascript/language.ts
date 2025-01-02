/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import CodeStudioLanguage from "../language";
// @ts-ignore
import JAVASCRIPT_TREESITTER_LANGUAGE from "./javascript.wasm?url";

export default class CodeStudioLanguageJavascript extends CodeStudioLanguage {
  constructor() {
    super(JAVASCRIPT_TREESITTER_LANGUAGE);
    return this;
  }
}
