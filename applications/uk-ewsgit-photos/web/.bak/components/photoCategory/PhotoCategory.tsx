/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import coreCSI from "@yourdash/csi/coreCSI";
import clippy from "@yourdash/shared/web/helpers/clippy";
import Heading from "@yourdash/chiplet/components/heading/Heading";
import { UKIcon } from "@yourdash/chiplet/components/icon/iconDictionary";
import IconButton from "@yourdash/chiplet/components/iconButton/IconButton";
import pth from "path-browserify";
import React, { useEffect } from "react";
import { IPhotoAlbum } from "../../../shared/photoAlbum";
import AlbumGrid from "../../views/albumGrid/AlbumGrid";
import PhotoGrid from "../../views/photoGrid/PhotoGrid";
import styles from "./PhotoCategory.module.scss";

const PhotoCategory: React.FC<{ path: string }> = ({ path }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [photoAlbum, setPhotoAlbum] = React.useState<IPhotoAlbum | null>(null);

  useEffect(() => {
    coreCSI.syncGetJson(
      `/app/photos/album/${path}`,
      (album: IPhotoAlbum) => {
        setPhotoAlbum({
          label: pth.basename(album.path),
          items: album.items,
          path: album.path,
        });
      },
      (error) => {
        console.log(error);
      },
    );
  }, []);

  if (photoAlbum === null) {
    return null;
  }

  return (
    <div className={styles.component}>
      <div className={clippy(styles.header, open && styles.open)}>
        {open ? (
          <IconButton
            onClick={() => {
              setOpen(false);
            }}
            icon={UKIcon.FoldUp}
          />
        ) : (
          <IconButton
            onClick={() => {
              setOpen(true);
            }}
            icon={UKIcon.FoldDown}
          />
        )}
        <Heading
          level={3}
          className={styles.label}
        >
          {photoAlbum.label}
        </Heading>
        <div className={"pl-2 gap-2 flex"}>
          {photoAlbum.items.photos.length > 0 && <div>Photos: {photoAlbum.items.photos.length}</div>}
          {photoAlbum.items.subAlbums.length > 0 && <div>Sub Albums: {photoAlbum.items.subAlbums.length}</div>}
          {photoAlbum.items.videos.length > 0 && <div>Videos: {photoAlbum.items.videos.length}</div>}
        </div>
      </div>
      {open && (
        <div className={styles.content}>
          <AlbumGrid albums={photoAlbum.items.subAlbums} />
          <PhotoGrid gridItems={photoAlbum.items} />
        </div>
      )}
    </div>
  );
};

export default PhotoCategory;
