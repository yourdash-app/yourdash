/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import CodeStudioLanguage from "../language";
// @ts-ignore
import PLAINTEXT_TREESITTER_LANGUAGE from "./markdown/markdown.wasm?url";

export default class CodeStudioLanguagePlaintext extends CodeStudioLanguage {
  constructor() {
    super(PLAINTEXT_TREESITTER_LANGUAGE);
    return this;
  }
}
