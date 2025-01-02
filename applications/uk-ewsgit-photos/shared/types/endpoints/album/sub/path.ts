/*
 * Copyright ©2025 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

export type EndpointAlbumSubPath = {
  data: {
    displayName: string; // name of the subalbum
    path: string; // path to the subalbum
    size: number; // number of media in the subalbum
    thumbnail: string; // the thumbnail of the subalbum
  }[];
  hasAnotherPage: boolean;
};
