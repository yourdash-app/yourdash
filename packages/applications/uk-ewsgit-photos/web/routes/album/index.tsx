/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UK from "@yourdash/uikit";
import Heading from "@yourdash/uikit/src/components/heading/heading.js";
import IconButton from "@yourdash/uikit/src/components/iconButton/iconButton.js";
import { FC } from "react";
import { useParams } from "react-router-dom";
import path from "path-browserify";
import AlbumMediaGrid from "../../components/AlbumMediaGrid/AlbumMediaGrid";
import SubAlbums from "../../components/SubAlbums/SubAlbums";
import styles from "./index.module.scss";
import { useNavigateTo } from "../../meta.yourdash";

const AlbumPathPage: FC = () => {
  const navigateTo = useNavigateTo();
  const albumPath = useParams()["*"] || "/";

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <IconButton
          accessibleLabel={"Go back"}
          icon={UKIcons.ChevronLeft}
          onClick={() => {
            if (!albumPath) return;

            const newPath = path.join(albumPath, "..");

            if ((newPath === "/" && albumPath === "/") || newPath === "") {
              navigateTo(`/`);

              return;
            }

            navigateTo(`/album/@/${newPath}`);
          }}
        />
        <Heading
          className={styles.heading}
          level={1}
          text={path.basename(albumPath) || albumPath}
        />
      </div>
      <SubAlbums
        scrollerClassName={styles.subAlbums}
        path={albumPath}
      />
      <AlbumMediaGrid
        scrollerClassName={styles.mediaGrid}
        path={albumPath}
      />
    </div>
  );
};

export default AlbumPathPage;
