/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { CSSProperties, ReactNode, useState } from "react";
import styles from "./ResizeContainer.module.scss";

interface IResizeContainerProps {
  style?: CSSProperties;
  className?: string;
  children: [ReactNode, ReactNode];
  direction: "column" | "row";
}

const ResizeContainer: React.FC<IResizeContainerProps> = ({ children, style, className, direction }) => {
  const [dragging, setDragging] = useState(false);
  const [containerSize, setContainerSize] = useState(0);
  const [resizeStart, setResizeStart] = useState(0);

  const ref = React.useRef<HTMLDivElement>(null);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) {
      return;
    }

    event.preventDefault();
    setDragging(true);
    setContainerSize(
      direction === "row"
        ? event.clientX - ref.current.getBoundingClientRect().left
        : event.clientY - ref.current.getBoundingClientRect().top,
    );
    setResizeStart(
      direction === "row"
        ? event.clientX - ref.current.getBoundingClientRect().left
        : event.clientY - ref.current.getBoundingClientRect().top,
    );
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !dragging) {
      return;
    }
    const currentPos =
      direction === "row"
        ? event.clientX - ref.current.getBoundingClientRect().left
        : event.clientY - ref.current.getBoundingClientRect().top;
    const delta = currentPos - resizeStart;
    setResizeStart(currentPos);
    setContainerSize(containerSize + delta);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div
      ref={ref}
      style={{
        ...style,
        flexDirection: direction,
        padding: 0,
      }}
      className={`${styles.component} ${className}`}
      onMouseMove={handleMouseMove}
    >
      <div
        style={{
          [direction === "row" ? "width" : "height"]: containerSize,
        }}
      >
        {children[0]}
      </div>
      <div
        style={
          direction === "row"
            ? {
                left: `${containerSize - 4}px`,
                cursor: "col-resize",
                top: 0,
                height: "100%",
                width: "0.5rem",
                ...(dragging
                  ? {
                      backgroundColor: "rgb(var(--theme-500))",
                      transition: "none",
                    }
                  : {}),
              }
            : {
                left: 0,
                cursor: "row-resize",
                top: `${containerSize - 4}px`,
                width: "100%",
                height: "0.5rem",
                ...(dragging
                  ? {
                      backgroundColor: "rgb(var(--theme-500))",
                      transition: "none",
                    }
                  : {}),
              }
        }
        className={styles.handle}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />
      {children[1]}
    </div>
  );
};

export default ResizeContainer;
