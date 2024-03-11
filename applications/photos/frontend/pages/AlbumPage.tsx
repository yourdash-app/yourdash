/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import csi from "@yourdash/csi/csi";
import Card from "@yourdash/uikit/depChiplet/components/card/Card";
import Heading from "@yourdash/uikit/depChiplet/components/heading/Heading";
import { YourDashIcon } from "@yourdash/uikit/depChiplet/components/icon/iconDictionary";
import IconButton from "@yourdash/uikit/depChiplet/components/iconButton/IconButton";
import pth from "path-browserify";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IPhotoAlbum } from "../../shared/photoAlbum";
import styles from "./AlbumPage.module.scss";
import PhotoGrid from "../views/photoGrid/PhotoGrid";

const HomePage: React.FC = () => {
  const albumPath = useParams()["*"];
  const navigate = useNavigate();
  const [photoAlbum, setPhotoAlbum] = React.useState<IPhotoAlbum | null>(null);

  useEffect(() => {
    csi.getJson(
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
      <div className={"flex flex-row items-center p-12 pl-4 pr-4"}>
        <IconButton
          icon={YourDashIcon.ChevronLeft}
          onClick={() => {
            navigate("..");
          }}
        />
        <Heading level={1} className={"pl-4"}>
          {photoAlbum.label}
        </Heading>
        <div className={"ml-auto gap-2 flex"}>
          {photoAlbum.items.photos.length > 0 && <Heading level={4}>Photos: {photoAlbum.items.photos.length}</Heading>}
          {photoAlbum.items.subAlbums.length > 0 && (
            <Heading level={4}>Sub Albums: {photoAlbum.items.subAlbums.length}</Heading>
          )}
          {photoAlbum.items.videos.length > 0 && <Heading level={4}>Videos: {photoAlbum.items.videos.length}</Heading>}
        </div>
      </div>
      <div className={styles.component}>
        <div className={styles.content}>
          <div className={"flex w-full gap-2"}>
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
      </div>
    </div>
  );
};

export default HomePage;
