/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Separator from "@yourdash/uikit/src/components/separator/separator.js";
import Spinner from "@yourdash/uikit/src/components/spinner/spinner";
import { FC, useEffect, useRef, useState } from "react";
import { MediaAlbumLargeGridItem } from "../../../../../shared/types/endpoints/media/album/large-grid";
import { EndpointMediaAlbumSubAlbums } from "../../../../../shared/types/endpoints/media/album/subAlbums";
import { PHOTOS_MEDIA_TYPE } from "../../../../../shared/types/mediaType";
import splitItemsIntoRows from "../../../../lib/splitItemsIntoRows";
import AlbumGridMediaRow from "../albumGridMediaRow/albumGridMediaRow";
import Album from "./album/album.js";
import styles from "./albumGrid.module.scss";

const AlbumGrid: FC<{
  albums: EndpointMediaAlbumSubAlbums;
  path: string;
}> = ({ albums }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState<
    {
      items: (MediaAlbumLargeGridItem<PHOTOS_MEDIA_TYPE.Image | PHOTOS_MEDIA_TYPE.Video> & { displayWidth: number })[];
      height: number;
    }[]
  >([]);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    let timeout: Timer;

    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setRows(splitItemsIntoRows(albums, ref.current?.getBoundingClientRect().width || 512, 256));
      }, 100);
    });

    resizeObserver.observe(ref.current, { box: "border-box" });
    setRows(splitItemsIntoRows(albums, ref.current.getBoundingClientRect().width || 512, 256));

    return () => {
      resizeObserver.disconnect();
    };
  }, [albums]);

  return (
    <div
      className={styles.component}
      ref={ref}
    >
      {rows.length === 0 && albums.length === 0 && <Spinner />}
      {albums.length > 0 && (
        <>
          <div className={styles.albumContainer}>
            {albums.map((subAlbum) => {
              return (
                <Album
                  album={subAlbum}
                  key={subAlbum.path}
                />
              );
            })}
          </div>
          {rows.length > 0 && <Separator direction={"column"} />}
        </>
      )}
      {rows.map((row) => {
        return (
          <AlbumGridMediaRow
            key={row.items[0].path}
            items={row.items}
            rowHeight={row.height}
          />
        );
      })}
    </div>
  );
};

export default AlbumGrid;
