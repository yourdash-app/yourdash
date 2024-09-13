/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Heading from "@yourdash/uikit/components/heading/heading.js";
import { UKIcon } from "@yourdash/uikit/components/icon/iconDictionary.js";
import IconButton from "@yourdash/uikit/components/iconButton/iconButton.js";
import { FC } from "react";
import { useSearchParams } from "react-router-dom";
import path from "path-browserify";
import AlbumMediaGrid from "../../components/AlbumMediaGrid/AlbumMediaGrid";
import SubAlbums from "../../components/SubAlbums/SubAlbums";
import styles from "./index.module.scss";
import { useNavigateTo } from "../../meta.yourdash";

const AlbumPathPage: FC = () => {
  const navigateTo = useNavigateTo();
  const [searchParams] = useSearchParams();
  const albumPath = searchParams.get("p") || "";

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <IconButton
          accessibleLabel={"Go back"}
          icon={UKIcon.ChevronLeft}
          onClick={() => {
            const newPath = path.join(albumPath, "..");

            if (newPath === "/" && albumPath === "/") {
              navigateTo(`/`);

              return;
            }

            navigateTo(`/album/?p=${newPath}`);
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
        path={albumPath || "/"}
      />
      <AlbumMediaGrid
        scrollerClassName={styles.mediaGrid}
        path={albumPath || "/"}
      />
    </div>
  );
};

export default AlbumPathPage;
