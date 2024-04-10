/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { CoreApi } from "../coreApi.js";

export default class CoreApiTheme {
  coreApi: CoreApi;

  constructor(coreApi: CoreApi) {
    this.coreApi = coreApi;

    return this;
  }
}
