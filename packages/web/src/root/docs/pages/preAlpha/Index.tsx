/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UKHeading from "@yourdash/uikit/src/components/heading/UKHeading.js";
import UKSubtext from "@yourdash/uikit/src/components/subtext/UKSubtext.js";
import React from "react";

const PreAlphaDocsPage: React.FC = () => (
  <div className={"text-center"}>
    <UKHeading text={"YourDash is currently in the Pre-Alpha stage!"} />
    <UKSubtext text={"This means that the project is not ready for daily usage and should not be expected to be stable"} />
  </div>
);

export default PreAlphaDocsPage;
