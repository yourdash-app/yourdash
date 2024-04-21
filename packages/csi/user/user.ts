/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { USER_ACTIVE_STATUS } from "@yourdash/shared/core/userActiveStatus";
import { USER_AVATAR_SIZE } from "@yourdash/shared/core/userAvatarSize";
import csi from "../csi";

export default class CSIYourDashUser {
  cached!: {
    fullName?: { first: string; last: string };
    avatar: {
      [key in USER_AVATAR_SIZE]?: string;
    };
  };
  username: string;

  constructor() {
    this.username = csi.getUsername();

    this.clearCachedResults();

    return this;
  }

  clearCachedResults() {
    this.cached = {
      avatar: {},
    };

    return this;
  }

  async getFullName(): Promise<{ first: string; last: string }> {
    if (this.cached.fullName) return this.cached.fullName;

    return new Promise((resolve, reject) => {
      csi.syncGetJson(
        `/core/user/current/fullname`,
        (data) => {
          this.cached.fullName = data;

          return resolve(this.cached.fullName || { first: "Unknown", last: "User" });
        },
        () => {
          reject({ first: "Unknown", last: "User" });
        },
      );
    });
  }

  async getAvatar(avatarSize: USER_AVATAR_SIZE): Promise<string> {
    if (this.cached?.avatar?.[avatarSize]) {
      return this.cached.avatar[avatarSize] || "";
    }

    return new Promise((resolve, reject) => {
      csi.getText(
        `/core/user/current/avatar/${avatarSize}`,
        (data) => {
          this.cached.avatar[avatarSize] = `${csi.getInstanceUrl()}${data}`;

          return resolve(this.cached.avatar[avatarSize] || "");
        },
        () => {
          reject("");
        },
      );
    });
  }

  async getActiveStatus(): Promise<USER_ACTIVE_STATUS> {
    return new Promise((resolve) => {
      csi.syncGetJson(`/core/user/${this.username}/active_status`, (data) => {
        return resolve(data?.activeStatus || USER_ACTIVE_STATUS.OFFLINE);
      });
    });
  }
}
