/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import KeyValueDatabase from "../../lib/keyValueDatabase.js";
import core from "../core.js";

export default class UserDatabase extends KeyValueDatabase {
  private userName: string;

  constructor(userName: string) {
    super();

    this.userName = userName;

    return this;
  }

  public set(key: string, value: unknown) {
    super.set(key, value);
    core.users.get(this.userName).saveDatabase();

    return this;
  }
}
