/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Box from "@yourdash/uikit/components/box/box.js";
import Heading from "@yourdash/uikit/components/heading/heading.js";
import { UKIcon } from "@yourdash/uikit/components/icon/iconDictionary.js";
import IconButton from "@yourdash/uikit/components/iconButton/iconButton.js";
import { FC } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import path from "path-browserify";
import AlbumMediaGrid from "../../components/AlbumMediaGrid/AlbumMediaGrid";
import SubAlbums from "../../components/SubAlbums/SubAlbums";
import styles from "./index.module.scss";

const AlbumPathPage: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const albumPath = searchParams.get("p") || "";

  return (
    <>
      <Box className={styles.header}>
        <IconButton
          accessibleLabel={"Go back"}
          icon={UKIcon.ChevronLeft}
          onClick={() => {
            const newPath = path.join(albumPath, "..");

            if (newPath === "/" && albumPath === "/") {
              navigate("/app/a/uk-ewsgit-photos/");

              return;
            }

            navigate(`/app/a/uk-ewsgit-photos/album/?p=${newPath}`);
          }}
        />
        <Heading
          className={styles.heading}
          level={1}
          text={path.basename(albumPath) || albumPath}
        />
      </Box>
      <SubAlbums
        scrollerClassName={styles.subAlbums}
        path={albumPath || "/"}
      />
      <AlbumMediaGrid
        scrollerClassName={styles.mediaGrid}
        path={albumPath || "/"}
      />
    </>
  );
};

export default AlbumPathPage;
