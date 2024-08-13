/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import coreCSI from "@yourdash/csi/coreCSI";
import Icon from "@yourdash/chiplet/components/icon/Icon";
import { UKIcon } from "@yourdash/chiplet/components/icon/iconDictionary";
import useCurrentModuleId from "@yourdash/shared/core/useCurrentModuleId";
import React from "react";
import { useNavigate } from "react-router-dom";
import applicationMeta from "../../../../../meta.yourdash";
import IGridItem from "../../../../../shared/grid";
import { calculateAspectRatio } from "../../../../../lib/splitItemsIntoRows";
import styles from "./Photo.module.scss";

const Photo: React.FC<IGridItem & { display: { rowHeight: number; height: number; width: number; aspectRatio: number } }> = ({
  path,
  dimensions,
  tags,
  type,
  itemUrl,
  display,
}) => {
  const moduleId = useCurrentModuleId(applicationMeta);
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        if (type === "image") {
          navigate(`/app/a/${moduleId}/photo/` + path);
        } else {
          navigate(`/app/a/${moduleId}/video/` + path);
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
          src={coreCSI.getInstanceUrl() + itemUrl}
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
            src={coreCSI.getInstanceUrl() + itemUrl}
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
