/*
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import { IHomeConnection, IHomeRecentFile, IHomeSharedFile, IHomeCommonStorageLocation } from "../../tabView/home.js";

export default interface EndpointTabViewHome {
  recentFiles: IHomeRecentFile[];
  connections: IHomeConnection[];
  sharedFiles: IHomeSharedFile[];
  commonStorageLocations: IHomeCommonStorageLocation[];
}
