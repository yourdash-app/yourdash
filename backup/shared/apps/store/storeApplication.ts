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
