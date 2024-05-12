/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import csi from "@yourdash/csi/csi.js";
import Card from "@yourdash/uikit/components/card/card.js";
import Text from "@yourdash/uikit/components/text/text.js";
import useResource from "@yourdash/web/src/lib/useResource.js";
import { FC } from "react";
import { EndpointAlbums } from "../../../../shared/types/endpoints/endpointAlbums.js";
import { useNavigate } from "react-router-dom";
import path from "path-browserify";

const Albums: FC = () => {
  const navigate = useNavigate();
  const albums = useResource<EndpointAlbums>(() => csi.getJson("/app::photos/album/@/photos"), []);

  if (!albums) return null;

  return (
    <>
      {albums.map((album) => {
        return (
          <Card
            key={album}
            onClick={() => {
              navigate("/app/a/photos/album/?p=" + album);
            }}
          >
            <Text text={path.basename(album)} />
          </Card>
        );
      })}
    </>
  );
};

export default Albums;
