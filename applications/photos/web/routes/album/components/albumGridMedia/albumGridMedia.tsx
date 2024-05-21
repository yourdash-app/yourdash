/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Icon from "@yourdash/uikit/components/icon/icon.js";
import { UKIcon } from "@yourdash/uikit/components/icon/iconDictionary.js";
import Image from "@yourdash/uikit/components/image/image.js";
import { FC } from "react";
import { MediaAlbumLargeGridItem } from "../../../../../shared/types/endpoints/media/album/large-grid.js";
import { MEDIA_TYPE } from "../../../../../shared/types/mediaType.js";
import { useNavigate } from "react-router-dom";
import styles from "./albumGridMedia.module.scss";

const AlbumGridMedia: FC<{
  data: MediaAlbumLargeGridItem<MEDIA_TYPE.IMAGE | MEDIA_TYPE.VIDEO>;
  aspectRatio: number;
  rowHeight: number;
  displayWidth: number;
}> = ({ data, aspectRatio, rowHeight, displayWidth }) => {
  const navigate = useNavigate();

  switch (data.type) {
    case MEDIA_TYPE.IMAGE:
    case MEDIA_TYPE.VIDEO:
      return (
        <div
          className={styles.component}
          style={{
            width: displayWidth !== 0 ? `${rowHeight * aspectRatio}px` : "100%",
            height: `${rowHeight}px`,
          }}
          onClick={() => {
            navigate("/app/a/photos/view/?p=" + data.path);
          }}
        >
          {data.type === MEDIA_TYPE.VIDEO && (
            <div className={styles.videoOverlay}>
              <Icon
                icon={UKIcon.Video}
                className={styles.videoIcon}
              />
            </div>
          )}
          <Image
            className={styles.image}
            disableLazyLoading={true}
            accessibleLabel={"User Photo"}
            src={data.mediaUrl}
            authenticatedImage
          />
        </div>
      );
    default:
      return <>MEDIA RENDERING ERROR</>;
  }
};

export default AlbumGridMedia;
