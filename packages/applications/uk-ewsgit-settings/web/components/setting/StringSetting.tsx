/*
 * Copyright ©2025 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import TextInput from "@yourdash/uikit/src/components/textInput/textInput";
import React from "react";
import ISetting from "../../../shared/types/setting";
import SETTING_TYPE from "../../../shared/types/settingType";
import BaseSetting from "./baseSetting";

const BooleanSetting: React.FC<{ setting: ISetting<SETTING_TYPE.STRING> }> = ({ setting }) => {
  const [value, setValue] = React.useState("");

  return (
    <BaseSetting setting={setting}>
      <TextInput
        placeholder={setting.value}
        accessibleName={setting.displayName || setting.id || ""}
        onChange={(val) => setValue(val)}
        defaultValue={value}
      />
    </BaseSetting>
  );
};

export default BooleanSetting;
