/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import csi from "@yourdash/csi/csi";
import Icon from "@yourdash/chiplet/components/icon/Icon";
import { UKIcon } from "@yourdash/chiplet/components/icon/iconDictionary";
import React from "react";
import { useNavigate } from "react-router-dom";
import IGridItem from "../../../../../shared/grid";
import { calculateAspectRatio } from "../../splitItemsIntoRows";
import styles from "./Photo.module.scss";

const Photo: React.FC<
  IGridItem & { display: { rowHeight: number; height: number; width: number; aspectRatio: number } }
> = ({ path, dimensions, tags, type, itemUrl, display }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        if (type === "image") {
          navigate("/app/a/photos/photo/" + path);
        } else {
          navigate("/app/a/photos/video/" + path);
        }
      }}
      className={styles.component}
      style={{
        width: display.width !== 0 ? `${display.rowHeight * calculateAspectRatio(dimensions)}px` : "100%",
        height: `${display.rowHeight}px`,
      }}
    >
      {type === "image" ? (
        <img
          alt={""}
          className={styles.media}
          src={csi.getInstanceUrl() + itemUrl}
          loading={"lazy"}
        />
      ) : (
        <>
          <div className={styles.videoOverlay}>
            <Icon
              icon={UKIcon.Video}
              className={styles.videoOverlayIcon}
            />
          </div>
          <video
            className={styles.media}
            src={csi.getInstanceUrl() + itemUrl}
            onMouseEnter={(e) => {
              e.currentTarget.play();
            }}
            onMouseLeave={(e) => {
              e.currentTarget.pause();
            }}
            autoPlay={false}
            controls={false}
            loop={true}
            muted={true}
          />
        </>
      )}
    </div>
  );
};

export default Photo;
