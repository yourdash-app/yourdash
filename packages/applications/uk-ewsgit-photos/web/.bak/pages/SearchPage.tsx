/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Heading from "@yourdash/chiplet/components/heading/Heading";
import { UKIcon } from "@yourdash/chiplet/components/icon/iconDictionary";
import TextInput from "@yourdash/chiplet/components/textInput/TextInput";
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
        icon={UKIcon.Search}
        placeholder={"Search Photos"}
      />
    </div>
  );
};

export default SearchPage;
