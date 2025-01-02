/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { USER_AVATAR_SIZE } from "@yourdash/shared/core/userAvatarSize";
import coreCSI from "../coreCSI";

export default class CSIYourDashTeam {
  cached!: {
    displayName?: string;
    avatar: {
      [key in USER_AVATAR_SIZE]?: string;
    };
  };
  teamName: string;

  constructor(teamId: string) {
    this.teamName = teamId;

    this.clearCachedResults();

    return this;
  }

  clearCachedResults() {
    this.cached = {
      avatar: {},
    };

    return this;
  }

  async getDisplayName(): Promise<string> {
    if (this.cached.displayName) return this.cached.displayName;

    return new Promise((resolve, reject) => {
      coreCSI.syncGetJson(
        `/core/teams/get/current-user`,
        () => {
          return resolve(this.cached.displayName || "Unknown User");
        },
        () => {
          reject("Unknown User");
        },
      );
    });
  }

  async getAvatar(avatarSize: USER_AVATAR_SIZE): Promise<string> {
    if (this.cached?.avatar?.[avatarSize]) {
      return this.cached.avatar[avatarSize] || "";
    }

    return new Promise((resolve, reject) => {
      coreCSI.getText(
        `/core/team/${this.teamName}/avatar/${avatarSize}`,
        (data) => {
          this.cached.avatar[avatarSize] = `${coreCSI.getInstanceUrl()}${data}`;

          return resolve(this.cached.avatar[avatarSize] || "");
        },
        () => {
          reject("");
        },
      );
    });
  }
}
