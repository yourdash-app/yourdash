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

import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter()
  return (
    <footer className='w-full flex flex-col pl-6 pr-6 bg-content-normal pt-5 border-t-2 border-solid border-content-border select-none'>
      <section className='child:rounded-full child:pl-4 child:transition-all child:pr-4 child:pt-2 child:pb-2 child:mr-2 pb-3 active:child:bg-content-border hover:child:bg-content-light child:text-text-secondary flex child:h-12 child:flex child:items-center child:justify-center'>
        <button onClick={() => {window.location.href = "https://github.com/ewsgit/devdash"}}>
          <span>Contribute</span>
        </button>
        <button onClick={() => {window.location.href = "https://github.com/ewsgit"}}>
          <span>Ewsgit</span>
        </button>
      </section>
      <section className='w-full text-text-primary flex pt-2 pb-4'>
        <p className='mr-auto'>Copyright © 2021-2022 Ewsgit</p>
        <p>Created By Ewsgit</p>
      </section>
    </footer>
  );
}
