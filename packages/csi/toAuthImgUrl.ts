/*
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import coreCSI from "./coreCSI";

export default function toAuthImgUrl(authenticatedImageSrc: string) {
  return coreCSI.getInstanceUrl() + authenticatedImageSrc;
}
