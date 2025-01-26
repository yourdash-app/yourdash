/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import IGridItem from "../../../../../shared/grid";
import Photo from "../photo/Photo.js";
import { calculateAspectRatio } from "../../../../../lib/splitItemsIntoRows";
import styles from "./PhotoGridRow.module.scss";

const GridItemRow: React.FC<{
  items: (IGridItem & { displayWidth: number; displayHeight: number })[];
  height: number;
}> = ({ items, height }) => {
  return (
    <div
      className={styles.row}
      style={{ height: height + "px" }}
    >
      {items.map((item) => {
        return (
          <Photo
            key={item.itemUrl}
            path={item.path}
            dimensions={item.dimensions}
            tags={item.tags}
            type={item.type}
            itemUrl={item.itemUrl || ""}
            display={{
              rowHeight: height,
              height: item.displayHeight,
              width: item.displayWidth,
              aspectRatio: calculateAspectRatio(item.dimensions),
            }}
          />
        );
      })}
    </div>
  );
};

export default GridItemRow;
