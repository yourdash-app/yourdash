/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import csi from "@yourdash/csi/csi";
import React, { useEffect, useState } from "react";
import { IPhotoAlbum } from "../shared/types/photoAlbum";
import PhotoCategory from "./components/photoCategory/PhotoCategory";
import pth from "path-browserify";

const PhotosApplication: React.FC = () => {
  const [photoCategories, setPhotoCategories] = useState<IPhotoAlbum[]>([]);

  useEffect(() => {
    setPhotoCategories([]);

    csi.getJson(
      `/app/photos/albums`,
      (albums: string[]) => {
        albums.map((a) => {
          csi.getJson(
            `/app/photos/album/${a}`,
            (album: IPhotoAlbum) => {
              console.log(album);

              setPhotoCategories([
                ...photoCategories,
                {
                  path: a,
                  name: pth.basename(a),
                  items: album.items,
                },
              ]);
            },
            (error) => {
              console.log(error);
            },
          );
        });
      },
      (error) => {
        console.log(error);
      },
    );
  }, []);

  return (
    <div className={"flex flex-col h-full bg-bg overflow-hidden overflow-y-auto p-4 gap-2"}>
      {photoCategories.length === 0 && (
        <>
          <div className={"text-3xl"}>No photos yet</div>
        </>
      )}
      {photoCategories.map((photoCategory) => {
        return (
          <PhotoCategory
            key={photoCategory.path}
            name={photoCategory.name}
            items={photoCategory.items}
            path={photoCategory.path}
          />
        );
      })}
    </div>
  );
};

export default PhotosApplication;
