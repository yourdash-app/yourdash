/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import csi from "@yourdash/csi/csi";
import { chunk } from "@yourdash/shared/web/helpers/array";
import Card from "@yourdash/uikit/components/card/card";
import Image from "@yourdash/uikit/components/image/image";
import Text from "@yourdash/uikit/components/text/text";
import InfiniteScroll from "@yourdash/uikit/views/infiniteScroll/infiniteScroll";
import React, { useEffect, useState } from "react";
import { EndpointAlbumSubPath } from "../../../shared/types/endpoints/album/sub/path";
import styles from "./SubAlbums.module.scss";
import { useNavigate } from "react-router";

const SubAlbums: React.FC<{ path: string }> = ({ path }) => {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState<EndpointAlbumSubPath>([]);

  useEffect(() => {
    csi.getJson<EndpointAlbumSubPath>(`/app/photos/album/sub/0/@` + path).then((data) => {
      console.log(data);

      setAlbums(data);
    });
  }, []);

  if (!albums) return null;

  return (
    <InfiniteScroll
      hasMore={true}
      dataLength={albums.length}
      fetchData={() => {
        csi.getJson<EndpointAlbumSubPath>(`/app/photos/album/sub/${chunk(albums, 24).length}/@` + path).then((data) => {
          setAlbums([...albums, ...data]);
        });
      }}
      loader={<h4>Loading...</h4>}
      className={styles.component}
      containerClassName={styles.container}
    >
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
    </InfiniteScroll>
  );
};

export default SubAlbums;
