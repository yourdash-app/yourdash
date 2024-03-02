/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useContext, useState } from "react";
import IconButton from "../iconButton/IconButton";
import RightClickMenuContext from "../rightClickMenu/RightClickMenuContext";
import { YourDashIcon } from "../icon/iconDictionary";

export interface IDropdownIconButton {
  items: {
    name: string;
    shortcut?: string;
    onClick: () => void;
  }[];
  className?: string;
  icon: YourDashIcon;
}

const DropdownIconButton: React.FC<IDropdownIconButton> = ({ items, className, icon }) => {
  const rootContainerContext = useContext(RightClickMenuContext);

  const [dropdownShown, setDropdownShown] = useState(false);

  return (
    <IconButton
      icon={icon}
      className={className}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();

        const clientRect = e.currentTarget.getBoundingClientRect();

        if (dropdownShown) {
          rootContainerContext(0, 0, clientRect.width, clientRect.height, false, []);

          setDropdownShown(false);
          return;
        }

        rootContainerContext(
          clientRect.left,
          clientRect.bottom,
          clientRect.width,
          clientRect.height,
          true,
          items.map((item) => {
            return {
              label: item.name,
              onClick: () => {
                item.onClick();
              },
              shortcut: item.shortcut,
            };
          }),
        );

        setDropdownShown(true);

        const listener = (ev: MouseEvent) => {
          ev.preventDefault();

          rootContainerContext(0, 0, clientRect.width, clientRect.height, false, []);

          setDropdownShown(false);

          window.removeEventListener("click", listener);
          window.removeEventListener("contextmenu", listener);
        };

        window.addEventListener("click", listener);
        window.addEventListener("contextmenu", listener);
      }}
    />
  );
};

export default DropdownIconButton;
