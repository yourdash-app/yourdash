/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import Image from "@yourdash/uikit/components/image/image.tsx";
import React from "react";
import { AlbumMediaPath } from "../../../shared/types/endpoints/album/media/path.ts";

const AlbumMedia: React.FC<{ albumMedia: AlbumMediaPath }> = ({ albumMedia }) => {
  return (
    <>
      path: {albumMedia.path}
      {albumMedia.thumbnail ? (
        <Image
          accessibleLabel={""}
          src={albumMedia.thumbnailPath}
          authenticatedImage={true}
        />
      ) : (
        <div>MISSING THUMBNAIL ICON</div>
      )}
    </>
  );
};

export default AlbumMedia;
