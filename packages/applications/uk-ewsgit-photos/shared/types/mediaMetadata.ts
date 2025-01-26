/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { PHOTOS_MEDIA_TYPE } from "./mediaType.js";

export interface MediaMetadata<Type extends PHOTOS_MEDIA_TYPE> {
  width: number;
  height: number;
  duration: Type extends PHOTOS_MEDIA_TYPE.Video ? number : never;
  contains: {
    landmarks: string[];
    people: string[];
    objects: string[];
  };
}
