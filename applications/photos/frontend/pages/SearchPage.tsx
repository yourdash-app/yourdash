/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Heading from "@yourdash/uikit/depChiplet/components/heading/Heading";
import { YourDashIcon } from "@yourdash/uikit/depChiplet/components/icon/iconDictionary";
import TextInput from "@yourdash/uikit/depChiplet/components/textInput/TextInput";
import React from "react";

const SearchPage: React.FC = () => {
  return (
    <div>
      <Heading level={1}>Search Photos</Heading>
      <TextInput
        accessibleName={"Search Photos"}
        onChange={(val) => {
          return 0;
        }}
        icon={YourDashIcon.Search}
        placeholder={"Search Photos"}
      />
    </div>
  );
};

export default SearchPage;
