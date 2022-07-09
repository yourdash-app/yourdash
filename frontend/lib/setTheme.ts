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

// Copyright © Ewsgit 2022.
// Licensed under the MIT License - https://ewsgit.github.io/devdash/copyright

// the following code is currently unused due to the removal of user-selected color themes in the re-design of
// the devdash "/app/" ui
/*
 --- Color Themes ---

 green
 orange
 red
 blue
 purple

 */

import * as localforage from "localforage";

export default function setTheme() {
  if (typeof window !== "undefined") {
    // add the dark class to the body if the prefers-color-scheme is dark
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
      if (e.matches) {
        if (!document.body.classList.contains("dark")) {
          document.body.classList.add("dark");
        }
      } else {
        if (document.body.classList.contains("dark")) {
          document.body.classList.remove("dark");
        }
      }
    });
    // if the user set the theme mode the themeMode localStorage.setItem("themeMode", "dark")
    // then the theme will be dark
    if (localStorage.getItem("themeMode") === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    window.document.body.style.setProperty("--devdash-setTheme", "true")
  }
}

function HexToRgb(hex: string) {
  hex = hex.slice(1);
  var aRgbHex = hex.match(/.{1,2}/g) as RegExpMatchArray;
  var result = `${parseInt(aRgbHex[0], 16)} ${parseInt(aRgbHex[1], 16)} ${parseInt(aRgbHex[2], 16)}`;
  return result;
}
