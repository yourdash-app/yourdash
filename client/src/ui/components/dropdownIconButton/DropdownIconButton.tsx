import React, { useContext, useState } from "react";
import IconButton from "../iconButton/IconButton";
import RightClickMenuContext from "../rightClickMenu/RightClickMenuContext";
import { ChipletIcon } from "../icon/iconDictionary";

export interface IDropdownIconButton {
    items: {
        name: string;
        shortcut?: string;
        onClick: () => void;
    }[];
    className?: string;
    icon: ChipletIcon;
}

const DropdownIconButton: React.FC<IDropdownIconButton> = ({ items, className, icon }) => {
    const RootContainerContext = useContext(RightClickMenuContext);

    const [selectedOption, setSelectedOption] = useState("");
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
                            name: item.name,
                            onClick: () => {
                                setSelectedOption(item.name);
                                item.onClick();
                            },
                            shortcut: item.shortcut,
                        };
                    })
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
        ></IconButton>
    );
};

export default DropdownIconButton;
