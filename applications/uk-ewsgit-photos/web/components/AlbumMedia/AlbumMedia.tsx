/*
 * Copyright ©2025 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import coreCSI from "@yourdash/csi/coreCSI.ts";
import toAuthImgUrl from "@yourdash/csi/toAuthImgUrl.ts";
import useResource from "@yourdash/csi/useResource.ts";
import React from "react";
import { AlbumMediaPath } from "../../../shared/types/endpoints/album/media/path.ts";
import { acsi, useNavigateTo } from "../../meta.yourdash.ts";
import styles from "./AlbumMedia.module.scss";

const AlbumMedia: React.FC<{ albumMedia: AlbumMediaPath; showFilenames?: boolean }> = ({ albumMedia, showFilenames }) => {
  const navigateTo = useNavigateTo();
  const thumbnailPath = useResource(() => acsi.getJson(`/media/thumbnail/:res/@/*`, `/media/thumbnail/lowres/@/${albumMedia.path}`));

  if (!thumbnailPath || thumbnailPath.error) {
    return <div>Error</div>;
  }

  return (
    <div
      className={styles.component}
      onClick={() => {
        navigateTo(`/view/@/${albumMedia.path}`);
      }}
    >
      <UKImage
        className={styles.image}
        accessibleLabel={""}
        src={toAuthImgUrl(thumbnailPath?.thumbnail || "")}
      />
      {showFilenames && <UKText text={coreCSI.path.basename(albumMedia.path)} />}
    </div>
  );
};

export default AlbumMedia;
