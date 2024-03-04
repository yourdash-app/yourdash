/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import csi from "@yourdash/csi/csi";
import React, { useEffect, useState } from "react";
import { IPhoto } from "../shared/types/photo";
import { IPhotoCategory } from "../shared/types/photoCategory";
import PhotoCategory from "./components/photoCategory/PhotoCategory";

const PhotosApplication: React.FC = () => {
  const [photoCategories, setPhotoCategories] = useState<IPhotoCategory[]>([]);

  useEffect(() => {
    setPhotoCategories([]);

    csi.getJson(
      `/app/photos/categories`,
      (categories: string[]) => {
        categories.map((cat) => {
          setPhotoCategories([
            ...photoCategories,
            {
              id: cat,
              name: cat,
              items: (() => {
                let photos: IPhoto[] = [];

                csi.getJson(
                  `/app/photos/category/${cat}`,
                  (ps: IPhoto[]) => {
                    photos = ps;
                  },
                  (error) => {
                    console.log(error);
                  },
                );

                return photos;
              })(),
            },
          ]);
        });
      },
      (error) => {
        console.log(error);
      },
    );
  }, []);

  useEffect(() => {
    console.log(photoCategories);
  }, [photoCategories]);

  return (
    <div className={"flex flex-col h-full bg-bg overflow-hidden overflow-y-auto p-4 gap-2"}>
      {photoCategories.map((photoCategory) => {
        return (
          <PhotoCategory
            key={photoCategory.id}
            name={photoCategory.name}
            items={photoCategory.items}
            id={photoCategory.id}
          />
        );
      })}
    </div>
  );
};

export default PhotosApplication;
