/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import csi from "@yourdash/csi/csi.js";
import Card from "@yourdash/uikit/components/card/card.js";
import Text from "@yourdash/uikit/components/text/text.js";
import { FC } from "react";
import { MediaAlbumLargeGridItem } from "../../../../../../shared/types/endpoints/media/album/large-grid.js";
import { MEDIA_TYPE } from "../../../../../../shared/types/mediaType.js";
import path from "path-browserify";
import { useNavigate } from "react-router-dom";
import styles from "./album.module.scss";

const Album: FC<{ album: MediaAlbumLargeGridItem<MEDIA_TYPE.ALBUM> }> = ({ album }) => {
  const navigate = useNavigate();

  return (
    <Card
      containerClassName={styles.album}
      key={album.path}
      onClick={() => {
        navigate("/app/a/photos/album/?p=" + csi.path.toUnix(album.path));
      }}
    >
      <Text text={path.basename(csi.path.toUnix(album.path))} />
    </Card>
  );
};

export default Album;
