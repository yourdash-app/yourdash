/*
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import pg from "pg";
import { type Instance } from "./main.js";

class Authorization {
  instance: Instance;

  constructor(instance: Instance) {
    this.instance = instance;

    return;
  }

  async __internal_authHook() {
    try {
    } catch (err) {
      console.error(err);
    }
  }

  async authorizeUser(username: string, sessionToken: string) {
    return { unimplemented: true };
  }

  async authenticateUser(username: string, password: string) {
    return { unimplemented: true };
  }
}

export default Authorization;
