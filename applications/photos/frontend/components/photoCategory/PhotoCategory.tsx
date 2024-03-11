/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import csi from "@yourdash/csi/csi";
import clippy from "@yourdash/shared/web/helpers/clippy";
import Card from "@yourdash/uikit/depChiplet/components/card/Card";
import Heading from "@yourdash/uikit/depChiplet/components/heading/Heading";
import { YourDashIcon } from "@yourdash/uikit/depChiplet/components/icon/iconDictionary";
import IconButton from "@yourdash/uikit/depChiplet/components/iconButton/IconButton";
import pth from "path-browserify";
import React, { useEffect } from "react";
import { IPhotoAlbum } from "../../../shared/photoAlbum";
import PhotoGrid from "../../views/photoGrid/PhotoGrid";
import styles from "./PhotoCategory.module.scss";

const PhotoCategory: React.FC<{ path: string }> = ({ path }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [photoAlbum, setPhotoAlbum] = React.useState<IPhotoAlbum | null>(null);

  useEffect(() => {
    csi.getJson(
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
            icon={YourDashIcon.FoldUp}
          />
        ) : (
          <IconButton
            onClick={() => {
              setOpen(true);
            }}
            icon={YourDashIcon.FoldDown}
          />
        )}
        <Heading level={3} className={styles.label}>
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
          <div className={"flex w-full gap-2 flex-wrap"}>
            {photoAlbum.items.subAlbums.map((album) => {
              return (
                <a href={"#/app/a/photos/album/" + album.path} key={album.path} className={"flex flex-grow"}>
                  <Card onClick={() => 0} className={"flex flex-grow items-center text-center justify-center"}>
                    <Heading level={4}>{album.displayName}</Heading>
                  </Card>
                </a>
              );
            })}
          </div>
          <PhotoGrid gridPhotoPaths={photoAlbum.items.photos} />
        </div>
      )}
    </div>
  );
};

export default PhotoCategory;
