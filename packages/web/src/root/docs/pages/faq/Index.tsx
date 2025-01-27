/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import ComingSoon from "@yourdash/chiplet/views/ComingSoon.tsx";
import React from "react";

const FAQPage: React.FC = () => (
  <div className={"text-center"}>
    <>
      TODO: modify contents and remove coming soon
      <h3>What is YourDash?</h3>
      <p>
        YourDash is a personal cloud environment for project management, file sharing, and more
        <br />
        Some of the features of YourDash are:
        <br />
        File management and sharing,
        <br />
        Project management,
        <br />
        Version controlled file backup and sync,
        <br />
        personal cloud code editors,
        <br />
        fully customizable using plugins
      </p>
      <h3>Is YourDash free?</h3>
      <p>
        Yes! YourDash is free to use for everyone. See [installation instructions](/docs/get-started)
        <br />
        YourDash is free and open-source which means anyone can contribute to improve it's features and overall security.
      </p>
    </>
    <ComingSoon />
  </div>
);

export default FAQPage;
