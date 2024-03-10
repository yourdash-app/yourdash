/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export interface IPhoto {
  fileName: string;
  dimensions: {
    width: number;
    height: number;
  };
  tags: string[];
  people: string[];
  date: string; // new Date(string),
  imageUrl?: string;
}
