/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import ComingSoon from "@yourdash/chiplet/views/ComingSoon";
import React from "react";
import BasePageLayout from "../../components/BasePageLayout";

const Index: React.FC = () => {
  return (
    <BasePageLayout title={"Accessibility"}>
      <section className={"w-full h-full flex flex-col items-center col-span-2"}>
        <ComingSoon />
      </section>
    </BasePageLayout>
  );
};

export default Index;
