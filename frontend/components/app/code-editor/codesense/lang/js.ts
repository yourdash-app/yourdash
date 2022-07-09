/*
 *   Copyright (c) 2022 Ewsgit
 *   All rights reserved.

 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 */

import { TOKEN } from "./../Typings";

export default function TokenizeJs(code: string[]): TOKEN[][] {
  let output: TOKEN[][] = [[]];
  let lines: string[] = code;
  let bracket_level: number = 0;

  let assign_variable_keywords = ["let", "var", "const"];
  let generic_keywords = ["this", "else", "break", "continue", "return"];
  let default_global_variables = ["window", "document", "bota", "dota"];

  lines.forEach((currentLine, index) => {
    let outputCurrentLine: TOKEN[] = [];
    let words: string[] = [];
    words = currentLine.split(/\s+/).map(word => word + " ");

    let is_inside_string: boolean = false;
    for (let i = 0; i < words.length; i++) {
      let word = words[i];
      if (word.indexOf('"') !== -1 || word.indexOf("'") !== -1 || word.indexOf("`") !== -1)
        is_inside_string = !is_inside_string;
      if (word.indexOf('" ') !== -1 || word.indexOf("' ") !== -1 || word.indexOf("` ") !== -1) {
        is_inside_string = false;
        outputCurrentLine.push({
          type: "string",
          value: word,
          color: "#ff0000",
        });
        continue;
      }
      if (is_inside_string) {
        outputCurrentLine.push({
          type: "string",
          value: word,
          color: "#ff0000",
        });
        continue;
      }
      if (word === "function ") {
        outputCurrentLine.push({
          type: "keyword",
          value: word,
          color: "#ff0000",
        });
        i++;
        word = words[i];
        outputCurrentLine.push({
          type: "function",
          value: word,
          color: "#ff0000",
        });
        continue;
      }
      generic_keywords.map(keyword => {
        if (word === keyword + " ") {
          outputCurrentLine.push({
            type: "keyword",
            value: word,
            color: "#ff0000",
            bold: true,
          });
        }
      });
      outputCurrentLine.push({
        type: "unknown",
        value: word,
        color: "#ff0000",
      });
    }
    output.push(outputCurrentLine);
  });

  return output;
}
