/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { Card, Slides } from "../../../../ui/index";

const YourDashLoginSlides: React.FC = () => {
  return <>
    <Slides
      interval={2500}
      slides={[
        <div className={"text-7xl font-black -rotate-12"}>YourDash Login Slides</div>,
        <span>Placeholder 2</span>,
        <span>Placeholder 3</span>,
        <span>Placeholder 4</span>,
        <span>Placeholder 5</span>
      ]}/>
  </>
}

export default YourDashLoginSlides;
