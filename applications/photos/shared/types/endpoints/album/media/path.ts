/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import { PHOTOS_MEDIA_TYPE } from "../../../mediaType";

export type AlbumMediaMetadata = {
  people: string[]; // an array of people IDs
};

export type AlbumMediaPath = {
  path: string;
  resolution: { width: number; height: number };
  mediaType: PHOTOS_MEDIA_TYPE;
  metadata?: AlbumMediaMetadata;
};

type EndpointAlbumMediaPath = AlbumMediaPath[];

export default EndpointAlbumMediaPath;
