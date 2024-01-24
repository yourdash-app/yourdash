/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import CodeStudioLanguage from "../language";
// @ts-ignore
import JAVASCRIPT_TREESITTER_LANGUAGE from "./languages/javascript/javascript.wasm?url";

export default class CodeStudioLanguageJavascript extends CodeStudioLanguage {
  // follow the jetbrains dark theme colors
  tokens = {
    keyword: {
      italic: false,
      bold: false,
      color: "#cf8e6d",
    },
    string: {
      italic: false,
      bold: false,
      color: "#5caa66",
    },
    comment: {
      italic: false,
      bold: false,
      color: "#6b7d74",
    },
    number: {
      italic: false,
      bold: false,
      color: "#29abb7",
    },
    punctuation: {
      italic: false,
      bold: false,
      color: "#bcbec4",
    },
    variable: {
      italic: false,
      bold: false,
      color: "#a2bdab",
    },
    function: {
      italic: false,
      bold: false,
      color: "#4ca7d5",
    },
    operator: {
      italic: false,
      bold: false,
      color: "#bcbec4",
    },
    type: {
      italic: false,
      bold: false,
      color: "#b48d61",
    },
    boolean: {
      italic: false,
      bold: false,
      color: "#b48d61",
    },
    property: {
      italic: false,
      bold: false,
      color: "#c77dbb",
    },
  };

  constructor() {
    super();
    return this;
  }
}
