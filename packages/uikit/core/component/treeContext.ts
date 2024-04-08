/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UKRouter from "../router/router.js";

export interface DefaultComponentTreeContext {
  level: 0 | 1 | 2 | 3;
  router?: UKRouter;
}

export type ComponentTreeContext = object & DefaultComponentTreeContext;
