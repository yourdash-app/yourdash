/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import csi from "@yourdash/csi/csi";
import clippy from "@yourdash/shared/web/helpers/clippy";
import Card from "@yourdash/uikit/components/card/card";
import Image from "@yourdash/uikit/components/image/image";
import Text from "@yourdash/uikit/components/text/text";
import InfiniteScroll from "@yourdash/uikit/views/infiniteScroll/infiniteScroll";
import React, { useEffect, useState } from "react";
import { EndpointAlbumSubPath } from "../../../shared/types/endpoints/album/sub/path";
import styles from "./SubAlbums.module.scss";
import { useNavigate } from "react-router";

const SubAlbums: React.FC<{ path: string; scrollerClassName?: string }> = ({ path, scrollerClassName }) => {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState<EndpointAlbumSubPath>([]);
  const [hasMorePages, setHasMorePages] = useState(true);

  useEffect(() => {
    setHasMorePages(true);
    setAlbums([]);
  }, [path]);

  if (!albums) return null;

  return (
    <InfiniteScroll
      hasMorePages={hasMorePages}
      resetState={path}
      fetchNextPage={async (nextPageNumber) => {
        const data = await csi.getJson<EndpointAlbumSubPath>(`/app/photos/album/sub/${nextPageNumber}/@` + path);

        if (data?.length === 0) {
          setHasMorePages(false);
        }

        setAlbums((previousAlbums) => [...previousAlbums, ...data]);
      }}
      className={clippy(styles.component, scrollerClassName)}
    >
      {albums.map((album) => {
        return (
          <Card
            containerClassName={styles.album}
            key={album.path}
            onClick={() => {
              navigate("/app/a/uk-ewsgit-photos/album/?p=" + csi.path.toUnix(album.path));
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
    </InfiniteScroll>
  );
};

export default SubAlbums;
