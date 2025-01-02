/*
 * Copyright ©2025 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import ISetting from "../../setting.js";

export default interface EndpointSettingsCategory {
  displayName: string;
  id: string;
  // UNUSED but possible future idea
  icon?: string;
  description?: string;
  settings: { [key: string]: ISetting<never> };
}
