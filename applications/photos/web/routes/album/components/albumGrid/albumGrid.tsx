/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Separator from "@yourdash/uikit/components/separator/separator.js";
import Spinner from "@yourdash/uikit/components/spinner/spinner";
import { FC, useEffect, useRef, useState } from "react";
import { MediaAlbumLargeGridItem } from "../../../../../shared/types/endpoints/media/album/large-grid";
import { MEDIA_TYPE } from "../../../../../shared/types/mediaType";
import splitItemsIntoRows from "../../../../lib/splitItemsIntoRows";
import AlbumGridMediaRow from "../albumGridMediaRow/albumGridMediaRow";
import Album from "./album/album.js";
import styles from "./albumGrid.module.scss";
import path from "path-browserify";
import { useNavigate } from "react-router-dom";

const AlbumGrid: FC<{
  items: MediaAlbumLargeGridItem<MEDIA_TYPE.IMAGE | MEDIA_TYPE.VIDEO>[];
  albums: MediaAlbumLargeGridItem<MEDIA_TYPE.ALBUM>[];
}> = ({ items, albums }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState<
    {
      items: (MediaAlbumLargeGridItem<MEDIA_TYPE.IMAGE | MEDIA_TYPE.VIDEO> & { displayWidth: number })[];
      height: number;
    }[]
  >([]);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    let timeout: NodeJS.Timeout;

    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setRows(splitItemsIntoRows(items, ref.current?.getBoundingClientRect().width || 512, 256));
      }, 100);
    });

    resizeObserver.observe(ref.current, { box: "border-box" });
    setRows(splitItemsIntoRows(items, ref.current.getBoundingClientRect().width || 512, 256));

    return () => {
      resizeObserver.disconnect();
    };
  }, [items]);

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
              return <Album album={subAlbum} />;
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
