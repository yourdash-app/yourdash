/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { IPhoto } from "../../../shared/types/photo";

export interface IPhotoWithDisplayInfo extends IPhoto {
  display: {
    rowHeight: number;
    height: number;
    width: number;
    aspectRatio: number;
  };
}
