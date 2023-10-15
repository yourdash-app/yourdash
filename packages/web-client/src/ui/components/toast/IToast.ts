/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export default interface IToast {
  message: string;
  type: "success" | "error" | "info" | "warn";
  params?: {
    options?: {name: string, cb: () => void}[],
    noAutoClose?: boolean,
    onClose?: () => void
  }
}
