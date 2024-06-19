/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import csi from "@yourdash/csi/csi.js";
import Box from "@yourdash/uikit/components/box/box.js";
import ButtonWithIcon from "@yourdash/uikit/components/buttonWithIcon/buttonWithIcon";
import Heading from "@yourdash/uikit/components/heading/heading.js";
import { UKIcon } from "@yourdash/uikit/components/icon/iconDictionary.js";
import IconButton from "@yourdash/uikit/components/iconButton/iconButton.js";
import useResource from "@yourdash/csi/useResource";
import { FC, useEffect, useState } from "react";
import EndpointMediaAlbumLargeGrid, { MediaAlbumLargeGridItem } from "../../../shared/types/endpoints/media/album/large-grid.js";
import { useNavigate, useSearchParams } from "react-router-dom";
import path from "path-browserify";
import { MEDIA_TYPE } from "../../../shared/types/mediaType";
import styles from "./index.module.scss";
import AlbumGrid from "./components/albumGrid/albumGrid";

const AlbumPathPage: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const albumPath = searchParams.get("p") || "";
  const [page, setPage] = useState(0);
  const albumData =
    useResource<EndpointMediaAlbumLargeGrid>(
      () => csi.getJson(`/app::photos/media/album/large-grid/${page}/@/${albumPath}`),
      [albumPath, page],
    ) || [];

  useEffect(() => {
    console.log("reset page count as album path has changed");
    setPage(0);
  }, [albumPath]);

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
          items={
            albumData.filter((i) => {
              return i.type === MEDIA_TYPE.IMAGE || i.type === MEDIA_TYPE.VIDEO;
            }) as MediaAlbumLargeGridItem<MEDIA_TYPE.IMAGE | MEDIA_TYPE.VIDEO>[]
          }
          albums={albumData.filter((i) => i.type === MEDIA_TYPE.ALBUM) as MediaAlbumLargeGridItem<MEDIA_TYPE.ALBUM>[]}
        />
      </div>
      <div className={styles.pagination}>
        {albumData.length > 0 && (
          <>
            {page > 0 && (
              <ButtonWithIcon
                text={"Previous page"}
                icon={UKIcon.ChevronLeft}
                onClick={() => {
                  setPage(page - 1);
                }}
              />
            )}
            {(albumData.length === 64 || albumData.length === 63) && (
              <ButtonWithIcon
                text={"Next page"}
                icon={UKIcon.ChevronRight}
                onClick={() => {
                  setPage(page + 1);
                }}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default AlbumPathPage;
