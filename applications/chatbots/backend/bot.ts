/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export default class ChatbotsBot {
  token: string;
  id: string;
  teamId: string;

  constructor(id: string, teamId: string) {
    this.id = id;
    this.teamId = teamId;

    if (!this.token) {
      throw new Error("No token provided");
    }

    return this;
  }
}
