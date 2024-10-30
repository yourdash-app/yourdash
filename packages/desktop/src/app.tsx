/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UIKitRoot from "@yourdash/uikit/src/core/root";
import { createRoot } from "react-dom/client";
import MenuBar from "./modules/darwin/menubar/menubar";

const root = createRoot(document.getElementById("root"));
root.render(
  <UIKitRoot>
    <MenuBar />
  </UIKitRoot>,
);
