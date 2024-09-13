/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import coreCSI from "@yourdash/csi/coreCSI";

export default function loginUser(username: string, password: string) {
  return new Promise<void>((resolve, reject) => {
    coreCSI.syncPostJson(
      `/login/user/${username}/authenticate`,
      { password: password },
      (response) => {
        coreCSI.setSessionId(response.sessionId);
        coreCSI.setUserToken(response.token);
        coreCSI.setUsername(username);
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
