/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { IPhoto } from "../../../../../shared/photo";
import Photo from "../photo/Photo";
import { calculateAspectRatio } from "../../splitItemsIntoRows";
import styles from "./PhotoGridRow.module.scss";

const PhotoGridRow: React.FC<{
  items: (IPhoto & { displayWidth: number; displayHeight: number })[];
  height: number;
}> = ({ items, height }) => {
  return (
    <div className={styles.row} style={{ height: height + "px" }}>
      {items.map((item) => {
        return (
          <Photo
            key={item.imageUrl}
            fileName={item.fileName}
            dimensions={item.dimensions}
            tags={item.tags}
            people={item.people}
            date={item.date}
            imageUrl={item.imageUrl}
            display={{
              rowHeight: height,
              height: item.displayHeight,
              width: item.displayWidth,
              aspectRatio: calculateAspectRatio(item),
            }}
          />
        );
      })}
    </div>
  );
};

export default PhotoGridRow;
