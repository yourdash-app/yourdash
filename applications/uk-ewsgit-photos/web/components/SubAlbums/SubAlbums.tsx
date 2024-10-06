/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import coreCSI from "@yourdash/csi/coreCSI";
import clippy from "@yourdash/shared/web/helpers/clippy";
import Card from "@yourdash/uikit/components/card/card";
import Image from "@yourdash/uikit/components/image/image";
import Text from "@yourdash/uikit/components/text/text";
import InfiniteScroll from "@yourdash/uikit/views/infiniteScroll/infiniteScroll";
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
        const data = await acsi.getJson<EndpointAlbumSubPath>(`/album/sub/${nextPageNumber}/@` + path);

        console.log({ data: data.data });

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
            <Image
              containerClassName={styles.thumbnailContainer}
              className={styles.thumbnail}
              accessibleLabel={""}
              authenticatedImage={true}
              src={album.thumbnail}
            />
            <Text
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
