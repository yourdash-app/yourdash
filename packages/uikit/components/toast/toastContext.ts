/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";

const ToastContext = React.createContext({
  showToast: (data: { type: "success" | "error" | "warning" | "info" | "debug"; content: string; persist?: boolean }) => {
    /* empty */
  },
});

export default ToastContext;
