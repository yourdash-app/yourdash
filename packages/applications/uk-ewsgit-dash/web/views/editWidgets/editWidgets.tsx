/*
 * Copyright ©2025 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import UKButton from "@yourdash/uikit/src/components/button/UKButton.js";
import UKHeading from "@yourdash/uikit/src/components/heading/UKHeading.js";
import React from "react";

const EditWidgets: React.FC = () => {
  return (
    <div>
      <UKHeading text="Edit widgets" />
      <UKButton
        text="Edit"
        onClick={() => {
          console.log("Edit widgets dialog");
        }}
      />
    </div>
  );
};

export default EditWidgets;
