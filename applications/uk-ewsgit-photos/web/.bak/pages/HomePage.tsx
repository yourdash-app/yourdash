/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import coreCSI from "@yourdash/csi/coreCSI";
import Heading from "@yourdash/chiplet/components/heading/Heading";
import Separator from "@yourdash/chiplet/components/separator/Separator";
import React, { useEffect, useState } from "react";
import PhotoCategory from "../components/photoCategory/PhotoCategory";

const HomePage: React.FC = () => {
  const [photoAlbums, setPhotoAlbums] = useState<string[]>([]);

  useEffect(() => {
    setPhotoAlbums([]);

    coreCSI.syncGetJson(
      `/app/photos/albums`,
      (albums: string[]) => {
        setPhotoAlbums(albums);
      },
      (error) => {
        console.log(error);
      },
    );
  }, []);

  return (
    <div className={"flex flex-col h-full p-4 gap-2"}>
      <Heading level={1}>Home</Heading>
      <Separator direction={"horizontal"} />
      {photoAlbums.length === 0 && (
        <>
          <div className={"text-3xl"}>No photos yet</div>
        </>
      )}
      {photoAlbums.map((photoCategory) => {
        return (
          <PhotoCategory
            key={photoCategory}
            path={photoCategory}
          />
        );
      })}
    </div>
  );
};

export default HomePage;
