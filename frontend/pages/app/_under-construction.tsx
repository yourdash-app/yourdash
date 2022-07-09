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

import React from "react"

export default function UnderConstruction() {
  return (
    <div
      className={`[background-image:repeating-linear-gradient(45deg,rgb(220,190,0)_0%,rgb(0,0,0)_5%);] w-full min-h-full flex items-center justify-center flex-col relative`}>
      <h1 className={`text-center text-white text-6xl drop-shadow-[0.25rem_0.25rem_0_#000] z-10 mb-2`}>Under Construction</h1>
      <h2 className={`text-center text-white text-2xl bg-content-normal p-2 rounded-md z-10`}>The current page is under construction...</h2>
        <div className="w-full h-full bg-slate-600 bg-opacity-60 absolute top-0 left-0"></div>
    </div>
  );
}