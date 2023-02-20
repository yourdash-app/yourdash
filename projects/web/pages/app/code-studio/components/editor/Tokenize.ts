import { type Token } from "./Token";

export default function TokenizeString(str: string): Token[][] {
  const result: Token[][] = []

  const lines = str.split("\n")

  lines.forEach(line => {
    const lineTokens: Token[] = []

    // FIXME: use a different method, this doesn't work for minified files, DO NOT rely on space characters to separate words
    //
    //        maybe a good method could be splitting a file into lines, and check if the line begins with a tokenization string,
    //        then add that token to the output and remove it from the input string, repeat until the string is empty.

    function matchKeywords(inputString: string): string {

    }

    result.push(lineTokens)
  })

  return result
}
