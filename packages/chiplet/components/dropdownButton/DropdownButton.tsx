/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useContext, useState } from "react";
import RightClickMenuContext from "../rightClickMenu/RightClickMenuContext.js";
import Button from "../button/Button.js";

export interface IDropdownButton {
  children: string;
  items: {
    label: string;
    onClick: () => void;
  }[];
  className?: string;
}

const DropdownButton: React.FC<IDropdownButton> = ({ children, items, className }) => {
  const RootContainerContext = useContext(RightClickMenuContext);

  const [selectedOption, setSelectedOption] = useState("");
  const [dropdownShown, setDropdownShown] = useState(false);

  return (
    <Button
      className={className}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();

        const clientRect = e.currentTarget.getBoundingClientRect();

        if (dropdownShown) {
          RootContainerContext(0, 0, clientRect.width, clientRect.height, false, []);

          setDropdownShown(false);
          return;
        }

        RootContainerContext(
          clientRect.left,
          clientRect.bottom,
          clientRect.width,
          clientRect.height,
          true,
          items.map((item) => {
            return {
              label: item.label,
              onClick: () => {
                setSelectedOption(item.label);
                item.onClick();
              },
              shortcut: "",
            };
          }),
        );

        setDropdownShown(true);

        const listener = (ev: MouseEvent) => {
          ev.preventDefault();

          RootContainerContext(0, 0, clientRect.width, clientRect.height, false, []);

          setDropdownShown(false);

          window.removeEventListener("click", listener);
          window.removeEventListener("contextmenu", listener);
        };

        window.addEventListener("click", listener);
        window.addEventListener("contextmenu", listener);
      }}
    >
      {selectedOption || children}
    </Button>
  );
};

export default DropdownButton;
