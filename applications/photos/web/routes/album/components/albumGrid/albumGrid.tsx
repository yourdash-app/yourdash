/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { FC, useEffect, useRef, useState } from "react";
import { MediaAlbumLargeGridItem } from "../../../../../shared/types/endpoints/media/album/large-grid";
import { MEDIA_TYPE } from "../../../../../shared/types/mediaType";
import splitItemsIntoRows, { calculateRowHeight } from "../../../../lib/splitItemsIntoRows";
import AlbumGridMediaRow from "../albumGridMediaRow/albumGridMediaRow";
import styles from "./albumGrid.module.scss";

const AlbumGrid: FC<{ items: MediaAlbumLargeGridItem<MEDIA_TYPE>[] }> = ({ items }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState<
    { items: MediaAlbumLargeGridItem<MEDIA_TYPE> & { displayWidth: number }; height: number }[]
  >([]);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    setRows(splitItemsIntoRows(items, ref.current.getBoundingClientRect().width || 512, 256));
  }, [items]);

  return (
    <div
      className={styles.component}
      ref={ref}
    >
      {rows.map((row, i) => {
        return (
          <AlbumGridMediaRow
            items={row.items}
            rowHeight={row.height}
          />
        );
      })}
    </div>
  );
};

export default AlbumGrid;
