/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export interface ISubAlbum {
  displayName: string;
  path: string;
  coverPhoto?: string;
}

export interface IPhotoAlbum {
  path: string;
  // photo path array
  items: {
    photos: string[];
    subAlbums: ISubAlbum[];
    videos: string[];
  };
  label: string;
}
