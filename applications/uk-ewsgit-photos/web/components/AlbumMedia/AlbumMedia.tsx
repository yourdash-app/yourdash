/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import coreCSI from "@yourdash/csi/coreCSI.ts";
import toAuthImgUrl from "@yourdash/csi/toAuthImgUrl.ts";
import useResource from "@yourdash/csi/useResource.ts";
import Image from "@yourdash/uikit/components/image/image.tsx";
import Text from "@yourdash/uikit/components/text/text.tsx";
import React from "react";
import { AlbumMediaPath } from "../../../shared/types/endpoints/album/media/path.ts";
import EndpointMediaThumbnail from "../../../shared/types/endpoints/media/thumbnail.ts";
import { acsi, useNavigateTo } from "../../meta.yourdash.ts";
import styles from "./AlbumMedia.module.scss";

const AlbumMedia: React.FC<{ albumMedia: AlbumMediaPath; showFilenames?: boolean }> = ({ albumMedia, showFilenames }) => {
  const navigateTo = useNavigateTo();
  const thumbnailPath = useResource(() => acsi.getJson<EndpointMediaThumbnail>(`/media/thumbnail/lowres/@/${albumMedia.path}`));

  return (
    <div
      className={styles.component}
      onClick={() => {
        navigateTo(`/view/@/${albumMedia.path}`);
      }}
    >
      <Image
        className={styles.image}
        accessibleLabel={""}
        src={toAuthImgUrl(thumbnailPath?.thumbnail || "")}
      />
      {showFilenames && <Text text={coreCSI.path.basename(albumMedia.path)} />}
    </div>
  );
};

export default AlbumMedia;
