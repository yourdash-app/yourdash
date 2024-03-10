/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import csi from "@yourdash/csi/csi";
import React from "react";
import { IPhoto } from "../../../../../shared/photo";
import { calculateAspectRatio } from "../../splitItemsIntoRows";
import styles from "./Photo.module.scss";

const Photo: React.FC<
  IPhoto & { display: { rowHeight: number; height: number; width: number; aspectRatio: number } }
> = ({ fileName, dimensions, tags, people, date, imageUrl, display }) => {
  return (
    <div
      className={styles.component}
      style={{
        width:
          display.width !== 0
            ? `${display.rowHeight * calculateAspectRatio({ fileName, dimensions, tags, people, date, imageUrl })}px`
            : "100%",
        height: `${display.rowHeight}px`,
      }}
    >
      <img alt={""} className={styles.photo} src={csi.getInstanceUrl() + imageUrl} />
    </div>
  );
};

export default Photo;
