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

import React, { useEffect, useState } from "react";

export default function ToggleSwitch(props: {
  initialValue: boolean;
  disabled?: boolean;
  onChange: (newValue: boolean) => void;
}) {
  const [toggleState, setToggleState] = useState(props.initialValue);
  useEffect(() => {
    if (props?.disabled) setToggleState(props.initialValue);
  }, [props])
  return (
    <div
      onClick={() => {
        if (!props.disabled) {
          props.onChange(!toggleState);
          setToggleState(!toggleState);
        }
      }}
      className={`flex relative ${
        props?.disabled ? "cursor-not-allowed" : null
      } w-16 h-8 p-1 items-center rounded-full cursor-pointer transition-colors ${
        !props?.disabled ? (!toggleState ? "bg-red-400" : "bg-green-400") : "bg-content-light"
      }`}>
      <div
        className={`h-6 rounded-full aspect-square ${
          props?.disabled ? "bg-content-dark" : "bg-content-normal"
        } transition-all absolute ${!toggleState ? "left-1" : "left-[calc(100%-1.75rem)]"}`}></div>
    </div>
  );
}
