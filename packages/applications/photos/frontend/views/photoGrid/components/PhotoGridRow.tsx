/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { IPhoto } from "../../../../shared/types/photo";
import Photo from "../../../components/photo/Photo";
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
            key={item.fileName}
            fileName={item.fileName}
            dimensions={item.dimensions}
            tags={item.tags}
            people={item.people}
            date={item.date}
            url={item.url}
            displayHeight={item.displayHeight}
            displayWidth={item.displayWidth}
            className={styles.photo}
          />
        );
      })}
    </div>
  );
};

export default PhotoGridRow;
