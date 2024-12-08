/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Heading from "@yourdash/uikit/components/heading/heading.tsx";
import Subtext from "@yourdash/uikit/components/subtext/subtext.tsx";
import React from "react";

const PreAlphaDocsPage: React.FC = () => (
  <div className={"text-center"}>
    <Heading text={"YourDash is currently in the Pre-Alpha stage!"} />
    <Subtext text={"This means that the project is not ready for daily usage and should not be expected to be stable"} />
  </div>
);

export default PreAlphaDocsPage;
