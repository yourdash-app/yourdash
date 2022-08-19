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

import {TextEditorRenderingOptions} from "./../TextEditor"

export default function renderScrollBar(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, options: TextEditorRenderingOptions, lines: string[]) {
  let c = ctx

  let longest_line: string = "";
  lines.forEach(line => {
    if (line.length > longest_line.length) {
      longest_line = line
    }
  })

  let document_width = c.measureText(longest_line).width

  console.log(document_width)

  if (canvas.width < document_width) {
    c.fillStyle = options.scrollbar.horizontal.background;
    c.fillRect(0, canvas.height - options.scrollbar.horizontal.size, canvas.width, options.scrollbar.horizontal.size)
  }
}