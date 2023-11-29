/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { Slides } from "../../../../ui/index";

const YourDashLoginSlides: React.FC = () => {
  return <>
    <Slides
      interval={2500}
      slides={[
        <div className={"text-7xl font-black -rotate-12"}>YourDash Placeholder 1</div>,
        <div className={"text-7xl font-black -rotate-12"}>YourDash Placeholder 2</div>,
        <div className={"text-7xl font-black -rotate-12"}>YourDash Placeholder 3</div>,
        <div className={"text-7xl font-black -rotate-12"}>YourDash Placeholder 4</div>,
      ]}/>
  </>
}

export default YourDashLoginSlides;
