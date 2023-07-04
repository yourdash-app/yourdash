import Token from "./token";

export default class CodeStudioBaseLanguageParser {
  language: string;
  parsedTokens: Token[];

  constructor(language: string) {
    this.language = language;
    this.parsedTokens = [];
  }

  parseString(str: string) {
    return this;
  }

  parseLine(lineNumber: number, line: string) {
    return this;
  }
}
