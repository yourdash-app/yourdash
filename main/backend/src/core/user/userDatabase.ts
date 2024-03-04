/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import KeyValueDatabase from "../../helpers/keyValueDatabase.js";
import coreApi from "../coreApi.js";

export default class UserDatabase extends KeyValueDatabase {
  private userName: string;

  constructor(userName: string) {
    super();

    this.userName = userName;

    return this;
  }

  public set(key: string, value: any) {
    // eslint-disable-line @typescript-eslint/no-explicit-any
    super.set(key, value);
    coreApi.users.get(this.userName).saveDatabase();
  }
}
