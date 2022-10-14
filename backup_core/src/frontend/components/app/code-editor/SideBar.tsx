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
import { triggerResizeEvent } from "../../../lib/elementResize";
import DragScalableElement from "../../global/DragScalableElement";
import Icon, { DevDashIcon } from "../../global/Icon";

export default function SideBar() {
  const [ willResetTabSize, setWillResetTabSize ] = React.useState(false);
  const [ tabSize, setTabSize ] = React.useState(100);
  const [ openedTab, setOpenedTab ] = React.useState("Explorer");
  return (
    <div className={`h-full bg-purple-400 flex`}>
      <div className={`w-6 h-full bg-content-dark overflow-hidden`}>
        <SideBarTab
          name="Explorer"
          icon="file-directory-fill-16"
          onClick={() => {
            if (openedTab !== "Explorer") {
              console.log("click");
              if (tabSize < 300) {
                setTabSize(300);
                setWillResetTabSize(true);
              }
              return setOpenedTab("Explorer");
            }
            setOpenedTab("");
            setTabSize(0);
            return setWillResetTabSize(true);
          }}
        />
        <SideBarTab
          name="Git"
          icon="commit-24"
          onClick={() => {
            if (openedTab !== "Git") {
              console.log("click");
              if (tabSize < 300) {
                setTabSize(300);
                setWillResetTabSize(true);
              }
              return setOpenedTab("Git");
            }
            setOpenedTab("");
            setTabSize(0);
            return setWillResetTabSize(true);
          }}
        />
      </div>
      {openedTab !== "" ? (
        <DragScalableElement
          dragConfig={{
            scaleRight: true,
            startSizeX: tabSize,
          }}
          resetSize={willResetTabSize}>
          <div className={`w-full h-full bg-slate-400`}></div>
        </DragScalableElement>
      ) : null}
    </div>
  );
}

function SideBarTab(props: { name: string; icon: DevDashIcon; onClick: () => void }) {
  return (
    <div
      onClick={() => {
        props.onClick()
        setTimeout(() => {
          triggerResizeEvent()
        })
      }}
      className={`pt-2 pb-2 bg-content-normal hover:bg-content-light active:bg-content-dark transition-colors flex flex-col items-center justify-center text-text-primary cursor-pointer select-none shadow-xl`}>
      <div className={`[writing-mode:vertical-lr;] rotate-180`}>{props.name}</div>
      <Icon name={props.icon} className={"h-4 aspect-square mt-1 -rotate-90"} color={"rgb(225,255,255)"} />
      {/* <span className={`material-icons-round pb-2 text-lg [writing-mode:vertical-lr;] rotate-180`}>{props.icon}</span> */}
    </div>
  );
}