/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import coreCSI from "@yourdash/csi/coreCSI";
import { UKIcon } from "@yourdash/chiplet/components/icon/iconDictionary";
import IconButton from "@yourdash/chiplet/components/iconButton/IconButton";
import NavBar from "@yourdash/chiplet/components/navBar/NavBar";
import React from "react";
import { useParams } from "react-router-dom";
import IMedia from "../../shared/media";
import styles from "./PhotoPage.module.scss";
import YOURDASH_PHOTOS_APPLICATION_LOGO from "../../icon.avif";

const PhotoPage: React.FC<{ isPhoto: boolean }> = ({ isPhoto }) => {
  const mediaId = useParams()["*"];
  const [mediaData, setMediaData] = React.useState<IMedia>();

  React.useEffect(() => {
    if (isPhoto) {
      coreCSI.syncGetJson(
        "/app/photos/photo/" + mediaId,
        (media: IMedia) => {
          setMediaData(media);
        },
        () => {
          window.history.back();
        },
      );
    } else {
      coreCSI.syncGetJson(
        "/app/photos/video/" + mediaId,
        (media: IMedia) => {
          setMediaData(media);
        },
        () => {
          window.history.back();
        },
      );
    }
  }, [mediaId]);

  if (!mediaData) {
    return null;
  }

  return (
    <div className={styles.page}>
      <NavBar
        showBackButton={true}
        title={"Photos"}
        subtitle={"Preview"}
        iconUrl={YOURDASH_PHOTOS_APPLICATION_LOGO}
        extras={
          <>
            <IconButton
              icon={UKIcon.Download}
              onClick={() => {
                if (isPhoto) {
                  window.open(coreCSI.getInstanceUrl() + "/app/photos/download-photo/" + mediaId, "_blank");
                } else {
                  window.open(coreCSI.getInstanceUrl() + "/app/photos/download-video/" + mediaId, "_blank");
                }
              }}
            />
          </>
        }
      />
      <div className={styles.photoContainer}>
        {isPhoto ? (
          <img
            className={styles.photo}
            src={coreCSI.getInstanceUrl() + mediaData.itemUrl}
            alt={""}
          />
        ) : (
          <video
            className={styles.photo}
            src={coreCSI.getInstanceUrl() + mediaData.itemUrl}
            autoPlay={true}
            controls={true}
            loop={true}
          />
        )}
      </div>
    </div>
  );
};

export default PhotoPage;
