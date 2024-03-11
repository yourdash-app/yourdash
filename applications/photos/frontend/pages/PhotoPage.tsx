/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import csi from "@yourdash/csi/csi";
import Icon from "@yourdash/uikit/depChiplet/components/icon/Icon";
import { YourDashIcon } from "@yourdash/uikit/depChiplet/components/icon/iconDictionary";
import IconButton from "@yourdash/uikit/depChiplet/components/iconButton/IconButton";
import NavBar from "@yourdash/uikit/depChiplet/components/navBar/NavBar";
import React from "react";
import { useParams } from "react-router-dom";
import { IPhoto } from "../../shared/photo";
import styles from "./PhotoPage.module.scss";
import YOURDASH_PHOTOS_APPLICATION_LOGO from "../../icon.avif";

const PhotoPage: React.FC = () => {
  const photoId = useParams()["*"];
  const [photoData, setPhotoData] = React.useState<IPhoto>();

  React.useEffect(() => {
    csi.getJson(
      "/app/photos/photo/" + photoId,
      (photo: IPhoto) => {
        setPhotoData(photo);
      },
      () => {
        window.history.back();
      },
    );
  }, [photoId]);

  if (!photoData) {
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
              icon={YourDashIcon.Download}
              onClick={() => {
                window.open(csi.getInstanceUrl() + "/app/photos/download-photo/" + photoId, "_blank");
              }}
            />
          </>
        }
      />
      <div className={styles.photoContainer}>
        <img className={styles.photo} src={csi.getInstanceUrl() + photoData.imageUrl} alt={""} />
      </div>
    </div>
  );
};

export default PhotoPage;
