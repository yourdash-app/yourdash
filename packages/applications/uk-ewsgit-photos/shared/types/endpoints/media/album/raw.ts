/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { MediaMetadata } from "../../../mediaMetadata.js";
import { PHOTOS_MEDIA_TYPE } from "../../../mediaType.js";

export type MediaRaw<Type extends PHOTOS_MEDIA_TYPE.Image | PHOTOS_MEDIA_TYPE.Video> = {
  path: string;
  type: Type;
  metadata: MediaMetadata<Type>;
  mediaUrl: string;
};

type EndpointMediaRaw = MediaRaw<PHOTOS_MEDIA_TYPE.Image | PHOTOS_MEDIA_TYPE.Video>;

export default EndpointMediaRaw;
