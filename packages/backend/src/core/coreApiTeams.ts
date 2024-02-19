/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { CoreApi } from "./coreApi.js";
import YourDashTeam from "./team/team.js";

export default class CoreApiTeams {
  coreApi: CoreApi;

  constructor(coreApi: CoreApi) {
    this.coreApi = coreApi;

    return this;
  }

  async create(teamName: string) {
    const newTeam = new YourDashTeam(teamName);

    await newTeam.verify();

    return newTeam;
  }

  async get(teamName: string) {
    return new YourDashTeam(teamName);
  }
}
