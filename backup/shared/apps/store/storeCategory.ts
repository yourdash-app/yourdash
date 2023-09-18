import { StorePromotedApplication } from "./storePromotedApplication.js"

interface IStoreCategory {
  id: string,
  icon: string,
  bannerImage: string,
  promotedApplications: string[],
  displayName: string,
  applications: {
    name: string,
    icon: string,
    displayName: string
  }[]
}

export {type IStoreCategory}
