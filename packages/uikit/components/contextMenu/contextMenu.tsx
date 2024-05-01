/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { FC } from "react";
import contextMenuRootContext from "./contextMenuRootContext.js";

const ContextMenu: FC<{
  items: { label: string; onClick: () => void };
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}> = ({ items, children, className }) => {
  console.log(items);

  return (
    <contextMenuRootContext.Consumer>
      {(rootContext) => {
        return (
          <div
            className={className}
            onContextMenu={(e) => {
              e.stopPropagation();
              e.preventDefault();

              const menuRect = e.currentTarget.getBoundingClientRect();

              rootContext.createMenu({
                x: e.pageX,
                y: e.pageY,
                width: menuRect.width,
                height: menuRect.height,
              });

              const listener = (ev: MouseEvent) => {
                ev.preventDefault();

                rootContext(0, 0, clientRect.width, clientRect.height, false, []);

                window.removeEventListener("click", listener);
                window.removeEventListener("contextmenu", listener);
              };

              window.addEventListener("click", listener);
              window.addEventListener("contextmenu", listener);
            }}
          >
            {children}
          </div>
        );
      }}
    </contextMenuRootContext.Consumer>
  );
};

export default ContextMenu;
