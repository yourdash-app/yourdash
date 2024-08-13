/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Separator from "@yourdash/chiplet/components/separator/Separator.js";
import coreCSI from "@yourdash/csi/coreCSI";
import Heading from "@yourdash/chiplet/components/heading/Heading";
import { UKIcon } from "@yourdash/chiplet/components/icon/iconDictionary";
import IconButton from "@yourdash/chiplet/components/iconButton/IconButton";
import pth from "path-browserify";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { IPhotoAlbum } from "../../shared/photoAlbum";
import AlbumGrid from "../views/albumGrid/AlbumGrid";
import styles from "./AlbumPage.module.scss";
import PhotoGrid from "../views/photoGrid/PhotoGrid";

const HomePage: React.FC = () => {
  const albumPath = useParams()["*"];
  const [photoAlbum, setPhotoAlbum] = React.useState<IPhotoAlbum | null>(null);

  useEffect(() => {
    coreCSI.syncGetJson(
      `/app/photos/album/${albumPath}`,
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
  }, [albumPath]);

  if (photoAlbum === null) {
    return null;
  }

  return (
    <div className={"flex flex-col"}>
      <div className={"flex flex-row items-center p-6 pl-4 pr-4"}>
        <IconButton
          icon={UKIcon.ChevronLeft}
          onClick={() => {
            window.history.back();
          }}
        />
        <Heading
          level={1}
          className={"pl-4"}
        >
          {photoAlbum.label}
        </Heading>
        <div className={"ml-auto gap-2 flex"}>
          {photoAlbum.items.photos.length > 0 && <Heading level={4}>Photos: {photoAlbum.items.photos.length}</Heading>}
          {photoAlbum.items.subAlbums.length > 0 && <Heading level={4}>Sub Albums: {photoAlbum.items.subAlbums.length}</Heading>}
          {photoAlbum.items.videos.length > 0 && <Heading level={4}>Videos: {photoAlbum.items.videos.length}</Heading>}
        </div>
      </div>
      <Separator direction={"horizontal"} />
      <div className={styles.component}>
        <div className={styles.content}>
          <AlbumGrid albums={photoAlbum.items.subAlbums} />
          <PhotoGrid gridItems={photoAlbum.items} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
