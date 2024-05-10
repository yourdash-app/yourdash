/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Card from "@yourdash/uikit/components/card/card";
import Text from "@yourdash/uikit/components/text/text";
import { FC } from "react";
import { MediaAlbumLargeGridItem } from "../../../../../shared/types/endpoints/media/album/large-grid";
import { MEDIA_TYPE } from "../../../../../shared/types/mediaType";
import { calculateAspectRatio } from "../../../../lib/splitItemsIntoRows";
import AlbumGridMedia from "../albumGridMedia/albumGridMedia";
import styles from "./albumGridMediaRow.module.scss";
import path from "path-browserify";
import { useNavigate } from "react-router-dom";

const AlbumGridMediaRow: FC<{
  rowHeight: number;
  items: MediaAlbumLargeGridItem<MEDIA_TYPE>[];
}> = ({ rowHeight, items }) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.component}
      style={{ height: rowHeight + "px" }}
    >
      {items.map((item) => {
        if (item.type === MEDIA_TYPE.ALBUM) {
          return (
            <Card
              key={item.path}
              onClick={() => {
                navigate("/app/a/photos/album/@" + item.path);
              }}
            >
              <Text text={path.basename(item.path)} />
            </Card>
          );
        } else {
          return (
            <AlbumGridMedia
              key={item.path}
              data={item}
              rowHeight={rowHeight}
              aspectRatio={calculateAspectRatio({ height: item.metadata.height, width: item.metadata.width })}
            />
          );
        }
      })}
    </div>
  );
};

export default AlbumGridMediaRow;
