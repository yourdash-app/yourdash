/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import ISetting from "../../setting.js";

export default interface EndpointSettingsCategory {
  displayName: string;
  name: string;
  // UNUSED but possible future idea
  icon?: string;
  settings: ISetting<never>[];
}
