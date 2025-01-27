/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { createContext } from "react";

export default createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createMenu: (data: { x: number; y: number; width: number; height: number; items: { label: string; onClick: () => void }[] }) => {
    /* empty function */
  },
  destroyMenu: () => {
    /* empty function */
  },
});
