/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export interface IPhotoAlbum {
  path: string;
  // photo path array
  items: {
    photos: string[];
    subAlbums: string[];
  };
  label: string;
}
