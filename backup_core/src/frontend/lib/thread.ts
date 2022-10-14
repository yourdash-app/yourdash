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

// https://gist.github.com/ezzabuzaid/c8c14b2ccddca6a7e16a2cbbc3bac556

export function Thread(cb: Function, ...params: any) {
  const delegate = () => {
    onmessage = ({ data: { computation, message } }) => {
      const wrapper = (fn: any) => Function('"use strict"; return (' + fn.toString() + ")")();
      const result = wrapper(computation)(...message);
      postMessage(result);
    };
  };
  const functionBody = delegate
    .toString()
    .replace(/^[^{]*{\s*/, "")
    .replace(/\s*}[^}]*$/, "");
  return new Promise((resolve, reject) => {
    let blob = URL.createObjectURL(new Blob([functionBody], { type: "text/javascript" }));
    console.log(blob)
    const worker = new Worker(blob);
    worker.onmessage = ({ data }) => {
      resolve(data);
      worker.terminate();
    };
    worker.onerror = worker.onmessageerror = reject;
    worker.postMessage({ computation: cb.toString(), params });
    return worker;
  });
}
