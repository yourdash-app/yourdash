import { IYourDashStoreAuthor } from "../apps/store/storeAuthor";

export interface IYourDashApplication {
  name: string;
  displayName: string;
  description: string;
  category: string;
  authors: IYourDashStoreAuthor[]
}
