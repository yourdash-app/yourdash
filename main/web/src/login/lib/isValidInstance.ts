/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { INSTANCE_STATUS } from "@yourdash/shared/core/instanceStatus";

export default function isValidInstance(instanceUrl: string): Promise<boolean> {
  return new Promise<boolean>(async (resolve) => {
    fetch(`${instanceUrl}/test`)
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((jsonResponse) => {
        if (jsonResponse.type === "yourdash" && jsonResponse.status === INSTANCE_STATUS.OK) {
          resolve(true);
        }
      });
  });
}
