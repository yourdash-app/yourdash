/*
 * Copyright ©2025 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import { Heading, TextInput } from "@yourdash/uikit/src/components/index";
import React from "react";

const RootPage: React.FC = () => {
  return (
    <>
      {/* Header */}
      <div>
        <Heading
          text={"Weather"}
          level={1}
        />
        <TextInput
          accessibleName={"Location Select"}
          placeholder={"Enter location"}
        />
      </div>
      <Heading
        level={2}
        text={"Popular locations"}
      />
      <div>DIV HERE?</div>
    </>
  );
};

export default RootPage;
