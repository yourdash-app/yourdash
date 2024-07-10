/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import csi from "@yourdash/csi/csi.js";

export default function loginUser(username: string, password: string) {
  return new Promise<void>((resolve, reject) => {
    csi.syncPostJson(
      `/login/user/${username}/authenticate`,
      { password: password },
      (response) => {
        csi.setSessionId(response.sessionId);
        csi.setUserToken(response.token);
        csi.setUsername(username);
        resolve();
      },
      () => {
        // FIXME: show a toast if the login failed
        // csi.createClientNotification.toast.error("Login Error", "Invalid password");
        reject();
      },
      {
        type: localStorage.getItem("desktop_mode") ? "desktop" : "web",
      },
    );
  });
}
