/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { IYourDashStoreAuthor } from "../apps/store/storeAuthor.js";

export enum APPLICATION_TYPE {
  LOCAL,
  EXTERNAL,
  IFRAME,
}

export interface IYourDashApplicationConfig {
  name: string;
  displayName: string;
  description: string;
  category: string;
  authors: IYourDashStoreAuthor[];
  dependencies: string[];
}
