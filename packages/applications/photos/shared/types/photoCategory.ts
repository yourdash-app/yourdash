/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { IPhoto } from "./photo";

export interface IPhotoCategory {
  id: string;
  items: IPhoto[],
  name: string
}
