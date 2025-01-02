/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import KeyValueDatabase from "../../lib/keyValueDatabase.js";

export default class TeamDatabase extends KeyValueDatabase {
  private teamName: string;

  constructor(teamName: string) {
    super();

    this.teamName = teamName;

    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public set(key: string, value: any) {
    super.set(key, value);
  }
}
