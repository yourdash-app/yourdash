/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import csi from "@yourdash/csi/csi.js";
import Box from "@yourdash/uikit/components/box/box.js";
import Card from "@yourdash/uikit/components/card/card.js";
import Heading from "@yourdash/uikit/components/heading/heading.js";
import { UKIcon } from "@yourdash/uikit/components/icon/iconDictionary.js";
import IconButton from "@yourdash/uikit/components/iconButton/iconButton.js";
import Image from "@yourdash/uikit/components/image/image.js";
import useResource from "@yourdash/web/src/lib/useResource.js";
import { FC } from "react";
import EndpointMediaAlbumLargeGrid from "../../../shared/types/endpoints/media/album/large-grid.js";
import { useParams, useNavigate } from "react-router-dom";
import { MEDIA_TYPE } from "../../../shared/types/mediaType.js";
import path from "path-browserify";
import styles from "./[path].module.scss";

const AlbumPathPage: FC = () => {
  const navigate = useNavigate();
  const albumPath = useParams()["*"] || "";
  const albumData =
    useResource<EndpointMediaAlbumLargeGrid>(
      () => csi.getJson(`/app::photos/media/album/large-grid/@/${albumPath}`),
      [albumPath],
    ) || [];

  return (
    <>
      <Box className={styles.header}>
        <IconButton
          accessibleLabel={"Go back"}
          icon={UKIcon.ChevronLeft}
          onClick={() => {
            navigate(`/app/a/photos/album/@/${albumPath.split("/").slice(0, -1).join("/")}`);
          }}
        />
        <Heading
          level={1}
          text={path.basename(albumPath)}
        />
      </Box>
      {albumData.map((data) => {
        switch (data.type) {
          case MEDIA_TYPE.IMAGE:
            return (
              <>
                <Image
                  key={data.path}
                  accessibleLabel={path.basename(data.path)}
                  authenticatedImage
                  src={data.mediaUrl}
                />
              </>
            );
          case MEDIA_TYPE.VIDEO:
            return <div key={data.path}>Video not supported</div>;
          case MEDIA_TYPE.ALBUM:
            return (
              <Card
                key={data.path}
                onClick={() => {
                  navigate("/app/a/photos/album/@" + data.path);
                }}
              >
                {path.basename(data.path)}
              </Card>
            );
        }
      })}
    </>
  );
};

export default AlbumPathPage;
