/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import type IToastAction from "./toastAction";

export default interface Toast {
  type: "success" | "error" | "warning" | "info" | "debug";
  content: { title: string; body: string; actions?: IToastAction[] };
  persist?: boolean;
}
