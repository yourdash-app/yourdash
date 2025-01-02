/*
 * Copyright ©2025 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import ToggleSwitch from "@yourdash/chiplet/components/toggleSwitch/ToggleSwitch";
import React from "react";
import ISetting from "../../../shared/types/setting";
import SETTING_TYPE from "../../../shared/types/settingType";
import BaseSetting from "./baseSetting";

const BooleanSetting: React.FC<{ setting: ISetting<SETTING_TYPE.BOOLEAN> }> = ({ setting }) => {
  const [value, setValue] = React.useState(false);

  return (
    <BaseSetting setting={setting}>
      <ToggleSwitch
        setValue={(val) => setValue(val)}
        value={value}
      />
    </BaseSetting>
  );
};

export default BooleanSetting;
