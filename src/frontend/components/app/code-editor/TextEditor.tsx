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

import React, { useEffect, useRef, useState } from 'react';
import { githubDark } from '@ddietr/codemirror-themes/theme/github-dark';
import ReactCodeMirror from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';

export default function TextEditor(props: { language: string }) {
  const [ currentLanguage, setCurrentLanguage ] = useState(langs.typescript())
  useEffect(() => {
    switch (props.language) {
      case "tsx":
        setCurrentLanguage(langs.tsx())
        break
      case "jsx":
        setCurrentLanguage(langs.jsx())
        break
      case "javascript":
        setCurrentLanguage(langs.javascript())
        break
      case "typescript":
        setCurrentLanguage(langs.typescript())
        break
      case "css":
        setCurrentLanguage(langs.css())
        break
      case "html":
        setCurrentLanguage(langs.html())
        break
      case "python":
        setCurrentLanguage(langs.python())
        break
    }
  }, [props.language])
  return (      
    <ReactCodeMirror
      theme={githubDark}
      height={'100%'}
      lang={props.language}
      autoCapitalize={"yes"}
      autoCorrect={"yes"}
      indentWithTab={true}
      translate={"yes"}
      extensions={[
        currentLanguage
      ]}
    />
  );
}
