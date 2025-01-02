/*
 * Copyright ©2025 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import ISetting from "./setting.js";
import SETTING_TYPE from "./settingType.js";

export default interface SettingsCategory {
  id: string;
  displayName: string;
  description: string;
  settings: { [key: string]: ISetting<SETTING_TYPE> };
}
