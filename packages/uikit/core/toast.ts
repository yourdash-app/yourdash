/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import ToastContext from "../components/toast/toastContext.js";

export default function useToast() {
  const toastCtx = React.useContext(ToastContext);

  return {
    create(data: { type: "success" | "error" | "warning" | "info" | "debug"; content: string; persist?: boolean }) {
      toastCtx.showToast(data);
    },
  };
}
