/*
 * Copyright ©2025 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import SETTING_TYPE from "./settingType.js";
import TsTypeForSettingType from "./tsTypeForSettingType.js";

export default interface ISetting<T extends SETTING_TYPE> {
  id: string;
  // use the id if no display name is set
  displayName?: string;
  // POSSIBLE FUTURE IDEA
  icon?: string;
  type: T;
  value: TsTypeForSettingType<T>;
  description?: string;
  category: string;
}
