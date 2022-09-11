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

import React from "react";
import Link from "next/link";

export default function Copyright() {
  return (
    <div
      className={`w-full min-h-screen flex items-center justify-center overflow-x-hidden flex-col text-center bg-content-dark`}>
      <div
        className={`xl:max-w-7xl lg:max-w-5xl md:max-w-3xl rounded-none sm:p-10 md:p-16 bg-content-normal sm:rounded-2xl shadow-2xl text-text-secondary`}>
        <h1 className={`text-4xl mb-5 text-text-primary`}>DevDash is licensed under the MIT license</h1>
        <h2 className={`text-3xl mb-3`}>------ The MIT License (MIT) ------</h2>
        <div className={`child:mb-4`}>
          <p className={`text-2xl`}>Copyright © 2022 Ewsgit {"<https://github.com/ewsgit>"}</p>
          <p>
            Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
            documentation files (the “Software”), to deal in the Software without restriction, including without
            limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
            the Software, and to permit persons to whom the Software is furnished to do so, subject to the following
            conditions:
          </p>
          <p>
            The above copyright notice and this permission notice shall be included in all copies or substantial
            portions of the Software.
          </p>
          <p className={`text-red-600 font-bold`}>
            THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
            LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO
            EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
            AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
            OR OTHER DEALINGS IN THE SOFTWARE.
          </p>
          <Link href="/">
            <a className={`w-1/2 bg-content-light rounded-lg p-2 mt-10`}>Go back</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
