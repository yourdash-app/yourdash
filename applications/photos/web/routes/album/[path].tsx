/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import csi from "@yourdash/csi/csi.js";
import Card from "@yourdash/uikit/components/card/card.js";
import Heading from "@yourdash/uikit/components/heading/heading.js";
import Image from "@yourdash/uikit/components/image/image.js";
import useResource from "@yourdash/web/src/lib/useResource.js";
import { FC } from "react";
import EndpointMediaAlbumLargeGrid from "../../../shared/types/endpoints/media/album/large-grid.js";
import { useParams, useNavigate } from "react-router-dom";
import { MEDIA_TYPE } from "../../../shared/types/mediaType.js";

const AlbumPathPage: FC = () => {
  const navigate = useNavigate();
  const albumPath = useParams()["*"] || "";
  console.log(albumPath);
  const albumData =
    useResource<EndpointMediaAlbumLargeGrid>(
      () => csi.getJson(`/app::photos/media/album/large-grid/@/${albumPath}`),
      [albumPath],
    ) || [];

  return (
    <>
      <Heading
        level={1}
        text={"Album Name"}
      />
      {albumData.map((data) => {
        switch (data.type) {
          case MEDIA_TYPE.IMAGE:
            return (
              <>
                <Image
                  accessibleLabel={""}
                  authenticatedImage
                  src={data.mediaUrl}
                />
                ;
              </>
            );
          case MEDIA_TYPE.VIDEO:
            return <>Video not supported</>;
          case MEDIA_TYPE.ALBUM:
            return (
              <Card
                onClick={() => {
                  navigate("/album/" + data.path);
                }}
              >
                {data.path}
              </Card>
            );
        }
      })}
    </>
  );
};

export default AlbumPathPage;
