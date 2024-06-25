/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { MediaMetadata } from "../../../mediaMetadata.js";
import { MEDIA_TYPE } from "../../../mediaType.js";

export type MediaAlbumLargeGridItem<Type extends MEDIA_TYPE> = Type extends MEDIA_TYPE.ALBUM
  ? {
      path: string;
      type: Type;
    }
  : {
      path: string;
      type: Type;
      metadata: MediaMetadata<Type>;
      mediaUrl: string;
    };

type EndpointMediaAlbumLargeGrid = MediaAlbumLargeGridItem<MEDIA_TYPE>[];

export default EndpointMediaAlbumLargeGrid;
