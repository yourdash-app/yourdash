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

export default function LoadingHourglass() {
  return <div
    className={`flex items-center relative justify-center mt-5 aspect-square h-12 overflow-hidden bg-content-normal`}>
    <div
      className={`h-16 w-4 absolute bg-branding-primary animate-pulse-spin`}></div>
    <div
      className={`bg-content-normal overflow-hidden opacity-50 w-8 aspect-square rounded-full absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 origin-center flex items-center justify-center`}>
      <div className={`w-4 h-full animate-pulse-spin relative origin-center`}>
        <div
          className={`w-4 aspect-square bg-yellow-200 opacity-50 transition-all absolute animate-top-bottom`}></div>
      </div>
    </div>
    <div
      className={`border-[0.75rem] border-solid border-content-normal w-[4.25rem] aspect-square rounded-full absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2`}></div>
    <div
      className={`h-12 animate-spin animation-duration-2000 flex items-center justify-center`}>
      <div className={`w-4 aspect-square bg-content-normal rotate-45`}></div>
      <div
        className={`w-4 ml-[0.45rem] aspect-square bg-content-normal rotate-45`}></div>
    </div>
  </div>;
}