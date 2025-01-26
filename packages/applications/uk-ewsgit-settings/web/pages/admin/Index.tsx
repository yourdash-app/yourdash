/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import * as React from "react";
import ComingSoon from "@yourdash/chiplet/views/ComingSoon";
import BasePageLayout from "../../components/BasePageLayout";
import ManageUsers from "./sections/manageUsers/ManageUsers";

const Index: React.FC = () => (
  <BasePageLayout title={"Admin tools"}>
    <ManageUsers />
    <section className={"w-full h-full flex flex-col items-center col-span-2"}>
      <ComingSoon />
    </section>
  </BasePageLayout>
);

export default Index;
