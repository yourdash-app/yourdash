/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import csi from "@yourdash/csi/csi.js";
import Box from "@yourdash/uikit/components/box/box.js";
import Heading from "@yourdash/uikit/components/heading/heading.js";
import { UKIcon } from "@yourdash/uikit/components/icon/iconDictionary.js";
import IconButton from "@yourdash/uikit/components/iconButton/iconButton.js";
import useResource from "@yourdash/csi/useResource";
import { FC, useEffect } from "react";
import EndpointMediaAlbumLargeGrid, { MediaAlbumLargeGridItem } from "../../../shared/types/endpoints/media/album/large-grid.js";
import { useNavigate, useSearchParams } from "react-router-dom";
import path from "path-browserify";
import { EndpointMediaAlbumSubAlbums } from "../../../shared/types/endpoints/media/album/subAlbums";
import { MEDIA_TYPE } from "../../../shared/types/mediaType";
import styles from "./index.module.scss";
import AlbumGrid from "./components/albumGrid/albumGrid";

const AlbumPathPage: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const albumPath = searchParams.get("p") || "";
  const albumSubAlbums =
    useResource(() => csi.getJson<EndpointMediaAlbumSubAlbums>(`/app/photos/media/album/subAlbums/@/${albumPath}`), [albumPath]) || [];

  return (
    <>
      <Box className={styles.header}>
        <IconButton
          accessibleLabel={"Go back"}
          icon={UKIcon.ChevronLeft}
          onClick={() => {
            const newPath = path.join(albumPath, "..");

            if (newPath === "/" && albumPath === "/") {
              navigate("/app/a/photos/");

              return;
            }

            navigate(`/app/a/photos/album/?p=${newPath}`);
          }}
        />
        <Heading
          className={styles.heading}
          level={1}
          text={path.basename(albumPath) || albumPath}
        />
      </Box>
      <div className={styles.albumGrid}>
        <AlbumGrid
          albums={albumSubAlbums}
          path={albumPath}
        />
      </div>
    </>
  );
};

export default AlbumPathPage;
