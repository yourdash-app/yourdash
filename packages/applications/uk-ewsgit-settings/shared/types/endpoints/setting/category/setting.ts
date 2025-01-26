/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import SETTING_TYPE from "../../../settingType.js";
import TsTypeForSettingType from "../../../tsTypeForSettingType.js";

export default interface EndpointSettingCategorySetting<T extends SETTING_TYPE> {
  type: T;
  value: TsTypeForSettingType<T>;
}
