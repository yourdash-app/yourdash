/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { IPhoto } from "../../../shared/types/photo";
import { calculateAspectRatio } from "../../views/photoGrid/splitItemsIntoRows";
import styles from "./Photo.module.scss";

const Photo: React.FC<
  IPhoto & { display: { rowHeight: number; height: number; width: number; aspectRatio: number } }
> = ({ fileName, dimensions, tags, people, date, url, display }) => {
  return (
    <div
      className={styles.component}
      style={{
        width:
          display.width !== 0
            ? `${display.rowHeight * calculateAspectRatio({ fileName, dimensions, tags, people, date, url })}px`
            : "100%",
        height: `${display.rowHeight}px`,
      }}
    >
      <img alt={""} className={styles.photo} src={url} loading={"lazy"} />
    </div>
  );
};

export default Photo;
