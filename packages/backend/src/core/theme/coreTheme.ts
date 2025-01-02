/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Core } from "../core.js";

export default class coreTheme {
  core: Core;

  constructor(core: Core) {
    this.core = core;

    return this;
  }

  fetchForUser(username: string) {
    const user = this.core.users.get(username);

    return user.getTheme();
  }
}
