/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import ComingSoon from "../../../../ComingSoon";
import { MajorButton } from "../../../../ui";

const OverviewPage: React.FC = () => (
  <div className={"text-center"}>
    <h1 className={"text-6xl font-semibold tracking-wide animate__animated animate__fadeIn mt-8"}>Overview</h1>
    <p className={"animate__animated animate__fadeInDown animate__250ms mt-3"}>a quick and simple guide to the YourDash documentation</p>
    
    <footer className={"w-full flex max-w-screen-2xl"}>
      <MajorButton className={"ml-auto"}>{"Next page"}</MajorButton>
    </footer>
  </div>
);

export default OverviewPage;
