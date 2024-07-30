/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import csi from "@yourdash/csi/csi";
import clippy from "@yourdash/shared/web/helpers/clippy";
import InfiniteScroll from "@yourdash/uikit/views/infiniteScroll/infiniteScroll";
import React, { useEffect, useState } from "react";
import EndpointAlbumMediaPath from "../../../shared/types/endpoints/album/media/path";
import AlbumMedia from "../AlbumMedia/AlbumMedia";
import styles from "./AlbumMediaGrid.module.scss";
import { useNavigate } from "react-router";

const AlbumMediaGrid: React.FC<{ path: string; scrollerClassName?: string }> = ({ path, scrollerClassName }) => {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState<EndpointAlbumMediaPath>([]);
  const [hasMorePages, setHasMorePages] = useState(true);

  useEffect(() => {
    setHasMorePages(true);
    setAlbums([]);
  }, [path]);

  return (
    <InfiniteScroll
      hasMorePages={hasMorePages}
      resetState={path}
      fetchNextPage={async (nextPageNumber) => {
        const data = await csi.getJson<EndpointAlbumMediaPath>(`/app/photos/album/media/${nextPageNumber}/@` + path);
        setAlbums((previousAlbums) => [...previousAlbums, ...data]);
      }}
      className={clippy(styles.component, scrollerClassName)}
    >
      {albums.map((album) => {
        return <AlbumMedia />;
      })}
    </InfiniteScroll>
  );
};

export default AlbumMediaGrid;
