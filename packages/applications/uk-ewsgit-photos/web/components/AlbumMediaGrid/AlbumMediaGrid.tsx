/*
 * Copyright ©2025 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import clippy from "@yourdash/shared/web/helpers/clippy";
import { InfiniteScroll } from "@yourdash/uikit/src/views/index";
import React, { useEffect, useState } from "react";
import EndpointAlbumMediaPath from "../../../shared/types/endpoints/album/media/path";
import { acsi } from "../../meta.yourdash";
import AlbumMedia from "../AlbumMedia/AlbumMedia";
import styles from "./AlbumMediaGrid.module.scss";
import { useNavigate } from "react-router";

const AlbumMediaGrid: React.FC<{ path: string; scrollerClassName?: string }> = ({ path, scrollerClassName }) => {
  const navigate = useNavigate();
  const [albumMedia, setAlbumMedia] = useState<EndpointAlbumMediaPath["data"]>([]);

  useEffect(() => {
    setAlbumMedia([]);
  }, [path]);

  return (
    <InfiniteScroll
      resetState={path}
      fetchNextPage={async (nextPageNumber) => {
        const data = await acsi.getJson(`/album/media/:page/@/` + path, { page: nextPageNumber });

        setAlbumMedia((previousAlbums) => [...previousAlbums, ...data.data]);

        return { hasAnotherPage: data.hasAnotherPage };
      }}
      className={clippy(styles.component, scrollerClassName)}
    >
      {albumMedia.map((album) => {
        return (
          <AlbumMedia
            key={album.path}
            albumMedia={album}
            showFilenames={true}
          />
        );
      })}
    </InfiniteScroll>
  );
};

export default AlbumMediaGrid;
