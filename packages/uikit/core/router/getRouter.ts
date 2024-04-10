/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { AnyComponentOrHTMLElement } from "../component/type.js";
import UKRouter from "./router.js";

export default function getRouter(component: AnyComponentOrHTMLElement): UKRouter {
  return component.__internals.treeContext.router as UKRouter;
}
