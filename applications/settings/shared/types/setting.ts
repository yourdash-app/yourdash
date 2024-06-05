/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import SETTING_TYPE from "./settingType.js";
import TsTypeForSettingType from "./tsTypeForSettingType.js";

export default interface ISetting<T extends SETTING_TYPE> {
  id: string;
  displayName: string;
  // POSSIBLE FUTURE IDEA
  icon?: string;
  type: T;
  value: TsTypeForSettingType<T>;
  description?: string;
}
