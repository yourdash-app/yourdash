/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import csi from "@yourdash/csi/csi";
import useResource from "@yourdash/csi/useResource";
import Card from "@yourdash/uikit/components/card/card";
import Image from "@yourdash/uikit/components/image/image";
import Text from "@yourdash/uikit/components/text/text";
import React from "react";
import { EndpointAlbumSubPath } from "../../../shared/types/endpoints/album/sub/path";
import styles from "./SubAlbums.module.scss";
import { useNavigate } from "react-router";

const SubAlbums: React.FC<{ path: string }> = ({ path }) => {
  const navigate = useNavigate();
  const albums = useResource(() => csi.getJson<EndpointAlbumSubPath>(`/app/photos/album/sub/@${path}`), [path]);
  if (!albums) return null;

  return (
    <div className={styles.component}>
      {albums.map((album) => {
        return (
          <Card
            containerClassName={styles.album}
            key={album.path}
            onClick={() => {
              navigate("/app/a/photos/album/?p=" + csi.path.toUnix(album.path));
            }}
          >
            <Image
              containerClassName={styles.thumbnailContainer}
              className={styles.thumbnail}
              accessibleLabel={""}
              authenticatedImage={true}
              src={album.thumbnail}
            />
            <Text text={album.displayName} />
          </Card>
        );
      })}
    </div>
  );
};

export default SubAlbums;
