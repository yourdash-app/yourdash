/*
 * Copyright ©2025 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export default interface IMedia {
  path: string;
  dimensions: {
    width: number;
    height: number;
  };
  tags: string[];
  people: string[];
  date: string; // new Date(string),
  itemUrl?: string;
  type: "image" | "video";
}
