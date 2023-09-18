/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { IYourDashStoreAuthor } from "../apps/store/storeAuthor.js";

export interface IYourDashApplication {
  name: string;
  displayName: string;
  description: string;
  category: string;
  authors: IYourDashStoreAuthor[];
  dependencies: string[];
}
