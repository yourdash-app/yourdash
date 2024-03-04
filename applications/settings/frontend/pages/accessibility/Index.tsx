/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import ComingSoon from "@yourdash/web-client/src/ComingSoon";
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
