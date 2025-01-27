/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export interface ISubPhotoAlbum {
  displayName: string;
  path: string;
  coverPhoto?: string | null;
}

export interface IPhotoAlbum {
  path: string;
  // photo path array
  items: {
    photos: string[];
    subAlbums: ISubPhotoAlbum[];
    videos: string[];
  };
  label: string;
}
