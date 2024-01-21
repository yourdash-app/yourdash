/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import CodeStudioLanguage from "../language";
// @ts-ignore
import JAVASCRIPT_TREESITTER_LANGUAGE from "./languages/javascript/javascript.wasm?url";

export default class CodeStudioLanguageJavascript extends CodeStudioLanguage {
  treesitterLanguage = JAVASCRIPT_TREESITTER_LANGUAGE;

  constructor() {
    super();
    return this;
  }
}
