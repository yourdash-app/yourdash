/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import csi from "@yourdash/csi/csi";
import Card from "@yourdash/chiplet/components/card/Card";
import Heading from "@yourdash/chiplet/components/heading/Heading";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ISubPhotoAlbum } from "../../../shared/photoAlbum.js";

const AlbumGrid: React.FC<{ albums: ISubPhotoAlbum[] }> = ({ albums }) => {
  const navigate = useNavigate();

  return (
    <div className={"grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-2 w-full"}>
      {albums.map((album) => {
        return (
          <Card
            key={album.path}
            onClick={() => navigate("/app/a/photos/album/" + album.path)}
            className={"flex flex-grow items-center text-center justify-center flex-col gap-2"}
          >
            {album.coverPhoto && (
              <img
                loading={"lazy"}
                className={"max-w-[256px] aspect-square w-full rounded-xl"}
                src={csi.getInstanceUrl() + album.coverPhoto}
                alt={"Cover photo"}
              />
            )}
            <Heading level={4}>{album.displayName}</Heading>
          </Card>
        );
      })}
    </div>
  );
};

export default AlbumGrid;

/*
<div className={"flex w-full gap-2"}>
            {photoAlbum.items.subAlbums.map((album) => {
              return (

              );
            })}
          </div>
 */
