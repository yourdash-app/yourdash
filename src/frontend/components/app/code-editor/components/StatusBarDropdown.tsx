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

import { useState } from "react"

export default function StatusBarDropdown(props: { title: string, options: string[], callback: (option: string) => void }) {
  const [ shown, setShown ] = useState(false)
  return <main className="relative h-full">
    {
      shown ?
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 bg-content-normal text-text-secondary flex flex-col">
          {
            props.options.map((name: string) => {
              return <span className="w-full pt-1 pb-1 pl-4 pr-4 text-center bg-content-normal cursor-pointer select-none hover:bg-content-light active:bg-content-dark" onClick={() => props.callback(name)}>{name}</span>
            })
          }
        </div>
        : null
    }
    <div className={"h-full cursor-pointer text-text-secondary pl-2 pr-2 hover:bg-content-light active:bg-content-dark select-none"} onClick={() => { setShown(!shown) }}>
      {props.title}
    </div>
  </main>
}