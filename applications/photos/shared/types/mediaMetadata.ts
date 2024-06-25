/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { MEDIA_TYPE } from "./mediaType.js";

export interface MediaMetadata<Type extends MEDIA_TYPE> {
  width: number;
  height: number;
  duration: Type extends MEDIA_TYPE.VIDEO ? number : never;
  contains: {
    landmarks: string[];
    people: string[];
    objects: string[];
  };
}
