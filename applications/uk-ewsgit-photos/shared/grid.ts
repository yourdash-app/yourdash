/*
 * Copyright ©2025 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export default interface IGridItem {
  itemUrl: string;
  path: string;
  tags: string[];
  type: "image" | "video";
  dimensions: {
    width: number;
    height: number;
  };
}

export const MAX_HEIGHT = 320;
