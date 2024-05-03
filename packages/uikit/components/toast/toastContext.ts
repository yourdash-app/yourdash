/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";

const ToastContext = React.createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  showToast: (data: { type: "success" | "error" | "warning" | "info"; content: string; persist?: boolean }) => {},
});

export default ToastContext;
