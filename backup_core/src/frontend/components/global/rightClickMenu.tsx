/*
 *   Copyright (c) 2022 Ewsgit
 *   All rights reserved.
 *   Licensed under the MIT License - https://ewsgit.github.io/devdash/copyright
 */
import React, { useEffect } from "react";

export default function RightClickMenu(props: {
  children: React.ReactChild | React.ReactChild[];
  items: { title: string; onClick: () => void; keyboardShortcut?: string }[];
  className?: string;
}) {
  const [clicked, setClickState] = React.useState(false);
  const element = React.useRef<HTMLDivElement>(null);
  let elem = element.current as HTMLDivElement;
  useEffect(() => {
    let listener = (e: MouseEvent) => {
      setClickState(false);
    };
    window.addEventListener("devdash_right_click_menu", (e: any) => {
      if (e.detail.element === elem) return
      setClickState(false);
    })
    window.addEventListener("click", e => listener(e));
    return () => {
      window.removeEventListener("click", e => listener(e));
    };
  });
  if (props.className?.includes("absolute") || props.className?.includes("fixed"))
    throw Error("The classes 'absolute' and 'fixed' can't be applied to the RightClickMenu component.");
  return (
    <div
      className={`relative ${props.className || ""}`}
      ref={element}
      onContextMenu={e => {
        e.preventDefault();
        setClickState(!clicked);
        let event = new window.CustomEvent("devdash_right_click_menu", { detail: { target: e.target } });
        window.dispatchEvent(event);
      }}>
      <div
        className={`bg-content-normal shadow-xl text-text-primary rounded-xl p-2 absolute top-0 left-0 select-none ${
          clicked ? "block" : "hidden"
        }`}>
        {props.items.map((item, ind) => {
          return (
            <button
              key={ind}
              onClick={item.onClick}
              className={`min-w-max w-full rounded-lg transition-colors p-0.5 pl-2 pr-2 mb-1 last:mb-0 hover:bg-content-light active:bg-content-dark`}>
              {item.title}
            </button>
          );
        })}
      </div>
      {props.children}
    </div>
  );
}
