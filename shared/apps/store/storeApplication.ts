import { IYourDashStoreAuthor } from "./storeAuthor";

export interface IYourDashStoreApplication {
  name: string;
  displayName: string;
  description: string;
  category: string;
  icon: string;
  installed: boolean;
  authors: IYourDashStoreAuthor[]
}
