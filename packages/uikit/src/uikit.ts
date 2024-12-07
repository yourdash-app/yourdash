/*
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

export * as Components from "./components/index.ts";
export * as Views from "./views/index.ts";
export * as Core from "./core/index.ts";
export * as UtilityComponent from "./utilityComponent/index.ts";

import * as Components from "./components/index.ts";
import * as Views from "./views/index.ts";
import * as Core from "./core/index.ts";
import * as Utilities from "./utilityComponent/index.ts";

const UK = {
  Components: Components,
  Views: Views,
  Core: Core,
  Utilities: Utilities,
};

export default UK;
