import {TokenType} from "./tokenType";

export interface CodeStudioTheme {
  tokenTypes: {
    [k in TokenType]: string;
  };
}

const defaultTheme: CodeStudioTheme = {
  tokenTypes: {
    [TokenType.Plain]: "#ffffff",
    [TokenType.Punctuation]: "#ffffff",
    [TokenType.Identifier]: "#aa2222",
    [TokenType.Keyword]: "#8888ff",
    [TokenType.Number]: "#cccccc",
    [TokenType.Operator]: "#ffffff",
    [TokenType.String]: "#77ee33"
  }
};

export default defaultTheme;
