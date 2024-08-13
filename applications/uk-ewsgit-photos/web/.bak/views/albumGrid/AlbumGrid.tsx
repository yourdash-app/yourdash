/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import coreCSI from "@yourdash/csi/coreCSI";
import Card from "@yourdash/chiplet/components/card/Card";
import Heading from "@yourdash/chiplet/components/heading/Heading";
import useCurrentModuleId from "@yourdash/shared/core/useCurrentModuleId";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ISubPhotoAlbum } from "../../../../shared/photoAlbum";
import applicationMeta from "../../../meta.yourdash";

const AlbumGrid: React.FC<{ albums: ISubPhotoAlbum[] }> = ({ albums }) => {
  const moduleId = useCurrentModuleId(applicationMeta);
  const navigate = useNavigate();

  return (
    <div className={"grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-2 w-full"}>
      {albums.map((album) => {
        return (
          <Card
            key={album.path}
            onClick={() => navigate(`/app/a/${moduleId}/album/` + album.path)}
            className={"flex flex-grow items-center text-center justify-center flex-col gap-2"}
          >
            {album.coverPhoto && (
              <img
                loading={"lazy"}
                className={"max-w-[256px] aspect-square w-full rounded-xl"}
                src={coreCSI.getInstanceUrl() + album.coverPhoto}
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
