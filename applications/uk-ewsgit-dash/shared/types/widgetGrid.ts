/*
 * Copyright ©2025 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import { IWidget } from "./widget.js";
import type { IApplicationShortcutWidget } from "./widgets/applicationShortcut.js";

export interface IWidgetGrid {
  widgets: IWidget<IApplicationShortcutWidget["id"], IApplicationShortcutWidget["data"]>[];
}
