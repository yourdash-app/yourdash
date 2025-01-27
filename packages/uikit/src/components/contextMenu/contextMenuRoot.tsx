/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { FC, useEffect, useRef } from "react";
import UKButton from "../button/UKButton.tsx";
import ContextMenuRootContext from "./contextMenuRootContext.tsx";
import styles from "./contextMenuRoot.module.scss";

const ContextMenuRoot: FC<{ children: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [visible, setVisible] = React.useState(false);
  const [items, setItems] = React.useState([] as { label: string; onClick: () => void }[]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setVisible(false);
    });
  }, []);

  return (
    <ContextMenuRootContext.Provider
      value={{
        createMenu: ({ x, y, width, height, items: i }) => {
          const screenWidth = window.innerWidth;
          const screenHeight = window.innerHeight;

          const MENU_WIDTH = ref.current?.getBoundingClientRect().width || 200;
          const MENU_HEIGHT = ref.current?.getBoundingClientRect().height || 200;

          let resultX = x;
          let resultY = y;

          if (x + MENU_WIDTH >= screenWidth) {
            resultX = screenWidth - MENU_WIDTH;
          }

          if (y + MENU_HEIGHT >= screenHeight) {
            resultY = screenHeight - MENU_HEIGHT;
          }

          setPosition({
            x: resultX,
            y: resultY,
          });

          setItems(i);
          setVisible(true);
        },
        destroyMenu: () => {
          setVisible(false);
        },
      }}
    >
      <div
        ref={ref}
        style={{
          display: visible ? "flex" : "none",
          left: position.x,
          top: position.y,
        }}
        className={styles.component}
      >
        {items.map((item) => {
          return (
            <UKButton
              className={styles.button}
              text={item.label}
              onClick={item.onClick}
              key={item.label}
            />
          );
        })}
      </div>
      {children}
    </ContextMenuRootContext.Provider>
  );
};

export default ContextMenuRoot;
