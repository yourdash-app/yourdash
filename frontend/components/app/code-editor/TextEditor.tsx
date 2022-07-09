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

import React, { useState, useEffect } from "react";
import Tokenize from "./codesense/Tokenizer";
import Colorize from "./codesense/Colorizer";
import { TOKEN } from "./codesense/Typings";
import getCharacterWidth from "../../../lib/getCharacterWidth";

export default function TextEditor() {
  const [code, setCode] = useState([
    '(this is a test) === "aaa" "ass sss aaa" `hmmm mmmm mmmm mmm`  bbb this is a test',
    "and this is a function aaa()",
  ]);
  const [tokenizedCode, setTokenizedCode] = useState([] as TOKEN[][]);
  const [linesOfCode, setLinesOfCode] = useState([] as number[]);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 } as { x: number; y: number });
  let pressedKeys: string[] = [];
  useEffect(() => {
    setTokenizedCode(Colorize(Tokenize(code, "js")));
    setLinesOfCode(code.map((str, ind) => ind));
  }, [code]);
  let onKeyDownEvent = (e: KeyboardEvent) => {
    e.preventDefault();
    if (pressedKeys.indexOf(e.key) === -1) {
      pressedKeys.push(e.key);
    }
    onKeyPress();
  };
  let onKeyUpEvent = (e: KeyboardEvent) => {
    if (pressedKeys.indexOf(e.key) !== -1) {
      pressedKeys.splice(pressedKeys.indexOf(e.key), 1);
    }
  };
  let onKeyPress = () => {
    pressedKeys.map(key => {
      switch (key) {
        case "ArrowUp":
          setCursorPosition({ ...cursorPosition, y: cursorPosition.y-- });
          break;
        case "ArrowDown":
          setCursorPosition({ ...cursorPosition, y: cursorPosition.y++ });
          break;
        case "ArrowLeft":
          setCursorPosition({ ...cursorPosition, x: cursorPosition.x-- });
          break;
        case "ArrowRight":
          setCursorPosition({ ...cursorPosition, x: cursorPosition.x++ });
          break;
      }
    });
  };
  return (
    <div className={`w-full h-full grid grid-cols-[auto,1fr] font-["jetbrains_mono"] relative`}>
      <div className={`pr-2 pl-2 pt-2 bg-content-normal shadow-md z-10 text-text-secondary select-none`}>
        {linesOfCode.map(line => {
          return <div key={line}>{line + 1}</div>;
        })}
      </div>
      <div className="bg-content-light pt-2 pl-2 w-full h-full">
        <pre
          className={`relative overflow-scroll cursor-text w-full h-full`}
          tabIndex={0}
          onFocus={e => {
            e.target.addEventListener("keydown", onKeyDownEvent);
            e.target.addEventListener("keyup", onKeyUpEvent);
          }}
          onBlur={e => {
            e.target.removeEventListener("keydown", onKeyDownEvent);
            e.target.removeEventListener("keyup", onKeyUpEvent);
          }}
          onMouseMove={e => {
            e.preventDefault();
            setCursorPosition({
              x:
                Math.round(
                  (e.clientX - e.currentTarget.getClientRects()[0].x) / getCharacterWidth("0", "jetbrains_mono 24px")
                ) * getCharacterWidth("0", "jetbrains_mono 24px"),
              y: Math.floor((e.clientY - e.currentTarget.getClientRects()[0].y) / 24) * 24,
            });
          }}>
          {tokenizedCode.map((line, ind) => {
            return (
              <span key={ind} className={`flex`}>
                {line.map((token, tokenInd) => {
                  return (
                    <span key={tokenInd} style={{ color: token.color, fontWeight: token.bold ? "bold" : "normal" }}>
                      {token.value}
                    </span>
                  );
                })}
              </span>
            );
          })}
          <div
            className={`w-0.5 h-[24px] bg-branding-primary absolute top-0 left-0 animate-pulse`}
            style={{
              left: `${cursorPosition.x}px`,
              top: `${cursorPosition.y}px`,
            }}></div>
        </pre>
      </div>
    </div>
  );
}
