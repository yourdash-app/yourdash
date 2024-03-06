/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useContext } from "react";
import RightClickMenuContext from "../rightClickMenu/RightClickMenuContext";

export interface IDropdownContainer extends React.ComponentPropsWithoutRef<"div"> {
  items: {
    label: string;
    shortcut?: string;
    onClick: () => void;
  }[];
}

const DropdownContainer: React.FC<IDropdownContainer> = ({ items, children, ...extraProps }) => {
  const RootContainerContext = useContext(RightClickMenuContext);

  return (
    <div
      style={{ background: "transparent", border: "none", padding: 0, margin: 0 }}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();

        const clientRect = e.currentTarget.getBoundingClientRect();

        RootContainerContext(clientRect.left, clientRect.bottom, clientRect.width, clientRect.height, true, items);

        const listener = (ev: MouseEvent) => {
          ev.preventDefault();
          e.stopPropagation();

          RootContainerContext(0, 0, clientRect.width, clientRect.height, false, []);

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
};

export default DropdownContainer;
