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

import { useState, useEffect } from 'react';
import { Octokit } from '@octokit/rest';

export default function GitHeader() {
  const [results, setResults] = useState([]);
  const [isCompact, setIsCompact] = useState(false);
  return (
    <div
      className={`w-full h-64 flex items-center justify-center relative bg-content-normal shadow-2xl`}>
      <img
        className={
          'w-full h-full absolute top-0 left-0 opacity-75 pointer-events-none'
        }
        src={require('./../../../assets/git.svg').default.src}
        alt=''
      />
      <input
        className={`w-1/2 p-3 z-10 text-2xl text-center rounded-2xl`}
        placeholder={`Search Github`}
        type='text'
      />
      <div>
        {results.map((result, ind) => {
          return <div></div>;
        })}
      </div>
    </div>
  );
}
