/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import SETTING_TYPE from "./settingType.js";

type TsTypeForSettingType<T extends SETTING_TYPE> = T extends SETTING_TYPE.STRING
  ? string
  : T extends SETTING_TYPE.INT
    ? number
    : T extends SETTING_TYPE.FLOAT
      ? number
      : T extends SETTING_TYPE.DIRECTORY
        ? string
        : T extends SETTING_TYPE.FILE
          ? string
          : T extends SETTING_TYPE.FILE_OF_TYPE
            ? string
            : T extends SETTING_TYPE.COLOR
              ? string
              : T extends SETTING_TYPE.DATE
                ? string
                : T extends SETTING_TYPE.TIME
                  ? string
                  : T extends SETTING_TYPE.BOOLEAN
                    ? boolean
                    : T extends SETTING_TYPE.SELECTION
                      ? string
                      : T extends SETTING_TYPE.MULTIPLE_SELECTION
                        ? string[]
                        : never;

export default TsTypeForSettingType;
