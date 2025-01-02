/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { FC } from "react";
import contextMenuRootContext from "./contextMenuRootContext.tsx";

const UKContextMenu: FC<{
  items: { label: string; onClick: () => void }[];
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}> = ({ items, children, className }) => {
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
                items: items,
              });

              const listener = (ev: MouseEvent) => {
                ev.preventDefault();

                rootContext.destroyMenu();

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

export default UKContextMenu;
