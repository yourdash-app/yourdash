/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { WD_NAMESPACE } from "./coreWebDAV.js";

export default class WebDAVProperty {
  namespace: WD_NAMESPACE;

  constructor(namespace: WD_NAMESPACE) {
    this.namespace = namespace;

    return this;
  }
}
