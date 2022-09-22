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
import Icon from "../../global/Icon";
import RightClickMenu from "../../global/rightClickMenu";

export default function MenuBar() {
  return (
    <div className={`h-6 w-full bg-content-normal flex select-none shadow-md z-10`}>
      <Icon name="devdash" useDefaultColor className={"h-[90%] m-0.5 aspect-square"} />
      <div className={`flex h-full ml-1`}>
        <MenuItem
          name="File"
          menu={[
            {
              name: "New File",
            },
          ]}
        />
        <MenuItem
          name="Edit"
          menu={[
            {
              name: "New File",
            },
          ]}
        />
        <MenuItem
          name="View"
          menu={[
            {
              name: "New File",
            },
          ]}
        />
        <MenuItem
          name="Help"
          menu={[
            {
              name: "New File",
            },
          ]}
        />
      </div>
    </div>
  );
}

function MenuItem(props: {
  name: string;
  menu: {
    name: string;
    shortcut?: string;
  }[];
}) {
  const [clicked, setClicked] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    let listener = (e: CustomEventInit) => {
      if (e.detail.element === ref.current) return;
      setClicked(false);
    };
    window.addEventListener("devdash_right_click_menu", listener);
    return () => {
      window.removeEventListener("devdash_right_click_menu", listener);
    };
  });
  return (
    <>
      <div
        ref={ref}
        onClick={e => {
          setClicked(true);
          let event = new window.CustomEvent("devdash_right_click_menu", { detail: { target: e.target } })
          window.dispatchEvent(event);
          console.log(event);
        }}
        className={`pr-2 pl-2 bg-content-normal cursor-pointer select-none hover:bg-content-light active:bg-content-dark transition-colors text-text-primary`}>
        {props.name}
      </div>
      {clicked ? (
        <div
          onClick={() => {
            setClicked(false);
          }}>
          {props.menu.map((item, index) => {
            return (
              <div
                key={index}
                className={`pr-2 pl-2 bg-content-normal cursor-pointer select-none hover:bg-content-light active:bg-content-dark transition-colors text-text-primary`}>
                {item.name}
              </div>
            );
          })}
        </div>
      ) : null}
    </>
  );
}
