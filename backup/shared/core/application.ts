import { IYourDashStoreAuthor } from "../apps/store/storeAuthor.js";

export interface IYourDashApplication {
  name: string;
  displayName: string;
  description: string;
  category: string;
  authors: IYourDashStoreAuthor[];
  dependencies: string[];
}
