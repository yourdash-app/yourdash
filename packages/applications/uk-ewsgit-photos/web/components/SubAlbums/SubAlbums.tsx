/*
 * Copyright ©2025 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import coreCSI from "@yourdash/csi/coreCSI";
import toAuthImgUrl from "@yourdash/csi/toAuthImgUrl.ts";
import clippy from "@yourdash/shared/web/helpers/clippy";
import { Card } from "@yourdash/uikit/src/components/index";
import { InfiniteScroll } from "@yourdash/uikit/src/views/index";
import React, { useEffect, useState } from "react";
import { EndpointAlbumSubPath } from "../../../shared/types/endpoints/album/sub/path";
import { acsi, useNavigateTo } from "../../meta.yourdash";
import styles from "./SubAlbums.module.scss";

const SubAlbums: React.FC<{ path: string; scrollerClassName?: string }> = ({ path, scrollerClassName }) => {
  const navigateTo = useNavigateTo();
  const [albums, setAlbums] = useState<EndpointAlbumSubPath["data"]>([]);

  useEffect(() => {
    setAlbums([]);
  }, [path]);

  return (
    <InfiniteScroll
      resetState={path}
      fetchNextPage={async (nextPageNumber) => {
        const data = await acsi.getJson(`/album/sub/:page/@/*`, `/album/sub/${nextPageNumber}/@/${path}`);

        if (!data.data) {
          return { hasAnotherPage: false };
        }

        setAlbums((previousAlbums) => [...previousAlbums, ...data.data]);

        return { hasAnotherPage: data.hasAnotherPage };
      }}
      className={clippy(styles.component, scrollerClassName)}
    >
      {albums.map((album) => {
        return (
          <Card
            containerClassName={styles.album}
            key={album.path}
            onClick={() => {
              navigateTo(`/album/@/${coreCSI.path.toUnix(album.path)}`);
            }}
          >
            <UKImage
              containerClassName={styles.thumbnailContainer}
              className={styles.thumbnail}
              accessibleLabel={""}
              src={toAuthImgUrl(album.thumbnail)}
            />
            <UKText
              text={album.displayName}
              className={styles.albumTitle}
            />
          </Card>
        );
      })}
    </InfiniteScroll>
  );
};

export default SubAlbums;
