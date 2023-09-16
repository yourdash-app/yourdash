/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { TokenType } from "./tokenType";

export interface CodeStudioTheme {
  tokenTypes: {
    [k in TokenType]: string;
  };
}

const defaultTheme: CodeStudioTheme = {
  tokenTypes: {
    [TokenType.Identifier]: "gold",
    [TokenType.Keyword]: "#8888ff",
    [TokenType.String]: "#77ee33",
    [TokenType.Number]: "#cccccc",
    [TokenType.Operator]: "#ffffff",
    [TokenType.Punctuation]: "#ffffff",
    [TokenType.Plain]: "#ffffff",
    [TokenType.Comment]: "#888888",
    [TokenType.Empty]: "#00000000"
  }
};

export default defaultTheme;
