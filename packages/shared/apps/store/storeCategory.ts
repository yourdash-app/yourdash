/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

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

export { type IStoreCategory }
