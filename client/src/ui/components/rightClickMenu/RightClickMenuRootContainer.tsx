import * as React from "react";
import { useEffect } from "react";
import RightClickMenuContext from "./RightClickMenuContext";
import styles from "./RightClickMenuRootContainer.module.scss";
import RightClickMenuItem from "./RightClickMenuItem";

const RightClickMenuRootContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [position, setPosition] = React.useState({
    x: 0,
    y: 0,
  });
  const [visible, setVisible] = React.useState(false);
  const [items, setItems] = React.useState([] as RightClickMenuItem[]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setVisible(false);
    });
  }, []);

  return (
    <RightClickMenuContext.Provider
      value={(x, y, width, height, visible, items) => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const MAX_MENU_WIDTH = 200;

        let resultX = x;
        const resultY = y;

        if (x + MAX_MENU_WIDTH >= screenWidth)
          resultX = screenWidth - MAX_MENU_WIDTH;

        setPosition({
          x: resultX,
          y: resultY,
        });

        setVisible(visible);
        setItems(items);
      }}
    >
      <div
        style={{
          display: visible ? "flex" : "none",
          left: position.x,
          top: position.y,
        }}
        className={styles.component}
      >
        {items.map((item) => {
          return (
            <button
              type="button"
              onClick={item.onClick}
              key={item.name}
              tabIndex={2}
            >
              {item.name}
            </button>
          );
        })}
      </div>
      {children}
    </RightClickMenuContext.Provider>
  );
};

export default RightClickMenuRootContainer;
