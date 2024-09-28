/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import useResource from "@yourdash/csi/useResource.ts";
import Image from "@yourdash/uikit/components/image/image.tsx";
import Text from "@yourdash/uikit/components/text/text.tsx";
import React from "react";
import { AlbumMediaPath } from "../../../shared/types/endpoints/album/media/path.ts";
import EndpointMediaThumbnail from "../../../shared/types/endpoints/media/thumbnail.ts";
import { acsi } from "../../meta.yourdash.ts";
import styles from "./AlbumMedia.module.scss";

const AlbumMedia: React.FC<{ albumMedia: AlbumMediaPath; showFilenames?: boolean }> = ({ albumMedia, showFilenames }) => {
  const thumbnailPath = useResource(() => acsi.getJson<EndpointMediaThumbnail>(`/media/thumbnail/lowres/@/${albumMedia.path}`));

  return (
    <div className={styles.component}>
      <Image
        accessibleLabel={""}
        src={thumbnailPath?.thumbnail || ""}
        authenticatedImage={true}
      />
      {showFilenames && <Text text={albumMedia.path} />}
    </div>
  );
};

export default AlbumMedia;
