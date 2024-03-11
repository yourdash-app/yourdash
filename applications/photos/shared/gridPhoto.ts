/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export default interface IGridPhoto {
  imageUrl: string;
  path: string;
  tags: string[];
  dimensions: {
    width: number;
    height: number;
  };
}

export const MAX_HEIGHT = 320;
