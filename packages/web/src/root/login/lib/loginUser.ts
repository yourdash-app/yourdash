/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import coreCSI from "@yourdash/csi/coreCSI.ts";

export default function loginUser(username: string, password: string) {
  return new Promise<void>((resolve, reject) => {
    coreCSI.syncPostJson(
      `/login/user/authenticate`,
      { username: username, password: password },
      (response) => {
        coreCSI.setSessionId(response.sessionId);
        coreCSI.setUserToken(response.token);
        coreCSI.setUsername(username);
        resolve();
      },
      () => {
        // FIXME: show a toasts if the login failed
        // csi.createClientNotification.toasts.error("Login Error", "Invalid password");
        reject();
      },
      {
        type: localStorage.getItem("desktop_mode") ? "desktop" : "web",
      },
    );
  });
}
