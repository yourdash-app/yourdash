import csi from "@yourdash/csi/csi";
import Card from "@yourdash/uikit/components/card/card.js";
import Image from "@yourdash/uikit/components/image/image.js";
import { FC } from "react";
import { MediaAlbumLargeGridItem } from "../../../../../shared/types/endpoints/media/album/large-grid.js";
import { MEDIA_TYPE } from "../../../../../shared/types/mediaType.js";
import { useNavigate } from "react-router-dom";
import pth from "path-browserify";
import styles from "./albumGridMedia.module.scss";

const AlbumGridMedia: FC<{
  data: MediaAlbumLargeGridItem<MEDIA_TYPE>;
  aspectRatio: number;
  rowHeight: number;
  displayWidth: number;
}> = ({ data, aspectRatio, rowHeight, displayWidth }) => {
  const navigate = useNavigate();

  switch (data.type) {
    case MEDIA_TYPE.IMAGE:
      return (
        <div
          className={styles.component}
          style={{
            width: `${displayWidth}px`,
            height: `${rowHeight}px`,
          }}
        >
          <Image
            disableLazyLoading={true}
            accessibleLabel={"User Photo"}
            src={data.mediaUrl}
            authenticatedImage
          />
        </div>
      );
    case MEDIA_TYPE.VIDEO:
      return (
        <div
          key={data.path}
          className={styles.component}
          style={{
            width: `${displayWidth}px`,
            height: `${rowHeight}px`,
          }}
        >
          <video
            src={csi.getInstanceUrl() + data.mediaUrl}
            autoPlay={false}
            controls={false}
            disablePictureInPicture={true}
          />
        </div>
      );
    case MEDIA_TYPE.ALBUM:
      return (
        <Card
          key={data.path}
          onClick={() => {
            navigate("/app/a/photos/album/@" + data.path);
          }}
        >
          {pth.basename(data.path)}
        </Card>
      );
    default:
      return <>MEDIA RENDERING ERROR</>;
  }
};

export default AlbumGridMedia;
