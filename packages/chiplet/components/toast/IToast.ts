/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export default interface IToast {
  message: string;
  title: string;
  type: "success" | "error" | "info" | "warn" | "silent" | "debug";
  params?: {
    options?: { name: string; cb: () => void }[];
    noAutoClose?: boolean;
    onClose?: () => void;
  };
  uuid: string;
}
