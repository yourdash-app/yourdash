/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { WD_NAMESPACE } from "./coreApiWebDAV.js";

export default class WebDAVProperty {
  namespace: WD_NAMESPACE;

  constructor(namespace: WD_NAMESPACE) {
    this.namespace = namespace;

    return this;
  }
}
