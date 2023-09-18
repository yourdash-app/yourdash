/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { IYourDashStoreAuthor } from "./storeAuthor.js";

export interface IYourDashStoreApplication {
  name: string;
  displayName: string;
  description: string;
  category: string;
  icon: string;
  installed: boolean;
  authors: IYourDashStoreAuthor[];
  dependencies: string[];
}
