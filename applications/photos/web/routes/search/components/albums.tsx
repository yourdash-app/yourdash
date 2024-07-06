/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import csi from "@yourdash/csi/csi.js";
import Card from "@yourdash/uikit/components/card/card.js";
import Heading from "@yourdash/uikit/components/heading/heading.js";
import Text from "@yourdash/uikit/components/text/text.js";
import useResource from "@yourdash/csi/useResource";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import path from "path-browserify";
import { EndpointAlbums } from "../../../../shared/types/endpoints/albums";
import styles from "./albums.module.scss";

const Albums: FC = () => {
  const navigate = useNavigate();
  const albums = useResource<EndpointAlbums>(() => csi.getJson<EndpointAlbums>("/app::photos/album/@/photos"), []);

  if (!albums) return null;

  return (
    <>
      <Heading
        className={styles.heading}
        level={2}
        text={"Albums"}
      />
      <div className={styles.component}>
        {albums.map((album) => {
          return (
            <Card
              containerClassName={styles.album}
              key={album}
              onClick={() => {
                navigate("/app/a/photos/album/?p=" + csi.path.toUnix(album));
              }}
            >
              <Text text={path.basename(csi.path.toUnix(album))} />
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default Albums;
