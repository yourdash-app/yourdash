/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export default class CodeStudioLanguage {
  tokens: { [key: string]: { italic: boolean; bold: boolean; color: string } } =
    {};

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
