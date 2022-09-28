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
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE R THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 */

import React, { useState } from "react";
import SideBar from "./SideBar";
import MenuBar from "./MenuBar";
import TextEditor from "./TextEditor";
import StatusBar from "./StatusBar";
import StatusBarDropdown from "./components/StatusBarDropdown";

export default function Editor() {
  const [currentLanguage, setCurrentLanguage] = useState("typescript")
  return (
    <div className={`w-full h-full bg-red-900 grid grid-rows-[auto,1fr,auto] overflow-hidden`}>
      {/* MenuBar */}
      <MenuBar />
      {/* Center Content */}
      <div className={`grid w-full h-full grid-cols-[auto,1fr] overflow-hidden bg-cyan-700`}>
        {/* SideBar */}
        <SideBar />
        {/* Editor */}
        <TextEditor language={currentLanguage} options={{}} />
      </div>
      {/* StatusBar */}
      <StatusBar
        statusItems={{
          left: [],
          center: [],
          right: [
            <StatusBarDropdown options={[
              "jsx",
              "javascript",
              "tsx",
              "typescript",
              "python",
              "css",
              "html"
            ]} title={currentLanguage} callback={(lang) => {setCurrentLanguage(lang)}} />
          ],
        }}
      />
    </div>
  );
}
