/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import csi from "@yourdash/csi/csi";
import React from "react";
import { useNavigate } from "react-router-dom";
import IGridPhoto from "../../../../../shared/gridPhoto";
import { calculateAspectRatio } from "../../splitItemsIntoRows";
import styles from "./Photo.module.scss";

const Photo: React.FC<
  IGridPhoto & { display: { rowHeight: number; height: number; width: number; aspectRatio: number } }
> = ({ path, dimensions, tags, imageUrl, display }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate("/app/a/photos/photo/" + path);
      }}
      className={styles.component}
      style={{
        width:
          display.width !== 0
            ? `${display.rowHeight * calculateAspectRatio({ path, dimensions, tags, imageUrl })}px`
            : "100%",
        height: `${display.rowHeight}px`,
      }}
    >
      <img alt={""} className={styles.photo} src={csi.getInstanceUrl() + imageUrl} />
    </div>
  );
};

export default Photo;
