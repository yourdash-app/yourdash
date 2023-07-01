import Token from "./token";

export default class CodeStudioLanguageParser {
  language: string;
  parsedTokens: Token[][];

  constructor() {
    this.language = "javascript";
  }

  parse(rawFile: string) {
    return;
  }

  parseLine(lineNumber: number, line: string) {
  
  }
}
