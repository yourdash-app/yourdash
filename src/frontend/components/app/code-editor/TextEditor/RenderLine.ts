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

import { TOKEN } from './Typings';
import TextEditorOptions from '../../../../../shared_types/TextEditorOptions';

export default function renderLine(
  tokens: TOKEN[],
  topOffset: number,
  canvas: HTMLCanvasElement,
  options: TextEditorOptions
) {
  if (!tokens) return
  let c = canvas.getContext('2d');
  if (c === null || undefined) return;
  if (tokens.map((token) => token.value).join('').length > 1000) {
    c.fillStyle = options.theme.editor.foreground;
    c.fillText(
      tokens.map((token) => token.value).join(''),
      options.leftPadding,
      topOffset
    );
    return
  }
  let lastX = options.leftPadding;
  tokens.map((token, ind) => {
    let c = canvas.getContext('2d') as CanvasRenderingContext2D;
    c.fillStyle = token.color;
    c.font = options.fontSize + 'px MonoCraft';
    c.textBaseline = 'top';
    c.fillText(token.value, lastX, topOffset);
    lastX += c.measureText(token.value).width
  });
}
