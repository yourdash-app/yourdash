/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import csi from "@yourdash/csi/csi";
import Card from "@yourdash/chiplet/components/card/Card";
import Heading from "@yourdash/chiplet/components/heading/Heading";
import Icon from "@yourdash/chiplet/components/icon/Icon";
import { UKIcon } from "@yourdash/chiplet/components/icon/iconDictionary";
import Separator from "@yourdash/chiplet/components/separator/Separator";
import React, { useEffect, useState } from "react";
import PhotoCategory from "../components/photoCategory/PhotoCategory";

const HomePage: React.FC = () => {
  const [photoAlbums, setPhotoAlbums] = useState<string[]>([]);

  useEffect(() => {
    setPhotoAlbums([]);

    csi.getJson(
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
      <div className={"flex gap-2"}>
        <Card
          className={"gap-2 flex flex-col"}
          onClick={() => {
            return 0;
          }}
        >
          <Icon icon={UKIcon.Search} className={"h-8"} />
          <Heading level={3}>Search</Heading>
        </Card>
        <Card
          className={"gap-2 flex flex-col"}
          onClick={() => {
            return 0;
          }}
        >
          <Icon icon={UKIcon.Search} className={"h-8"} />
          <Heading level={3}>Search</Heading>
        </Card>
        <Card
          className={"gap-2 flex flex-col"}
          onClick={() => {
            return 0;
          }}
        >
          <Icon icon={UKIcon.Search} className={"h-8"} />
          <Heading level={3}>Search</Heading>
        </Card>
      </div>
      <Separator direction={"horizontal"} />
      {photoAlbums.length === 0 && (
        <>
          <div className={"text-3xl"}>No photos yet</div>
        </>
      )}
      {photoAlbums.map((photoCategory) => {
        return <PhotoCategory key={photoCategory} path={photoCategory} />;
      })}
    </div>
  );
};

export default HomePage;
