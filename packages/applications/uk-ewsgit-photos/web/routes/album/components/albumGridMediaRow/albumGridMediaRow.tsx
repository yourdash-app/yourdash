/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { FC } from "react";
import { MediaAlbumLargeGridItem } from "../../../../../shared/types/endpoints/media/album/large-grid";
import { PHOTOS_MEDIA_TYPE } from "../../../../../shared/types/mediaType";
import { calculateAspectRatio } from "../../../../lib/splitItemsIntoRows";
import AlbumGridMedia from "../albumGridMedia/albumGridMedia";
import styles from "./albumGridMediaRow.module.scss";

const AlbumGridMediaRow: FC<{
  rowHeight: number;
  items: (MediaAlbumLargeGridItem<PHOTOS_MEDIA_TYPE.Image | PHOTOS_MEDIA_TYPE.Video> & { displayWidth: number })[];
}> = ({ rowHeight, items }) => {
  return (
    <div
      className={styles.component}
      style={{ height: rowHeight + "px" }}
    >
      {items.map((item) => {
        return (
          <AlbumGridMedia
            key={item.path}
            data={item}
            rowHeight={rowHeight}
            aspectRatio={calculateAspectRatio({ height: item.metadata.height, width: item.metadata.width })}
            displayWidth={item.displayWidth}
          />
        );
      })}
    </div>
  );
};

export default AlbumGridMediaRow;
