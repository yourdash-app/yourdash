/*
 * Copyright ©2025 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import ComingSoon from "@yourdash/chiplet/views/ComingSoon.tsx";
import React from "react";

const Index: React.FC = () => (
  <div className={"text-center"}>
    <h1 className={"text-6xl font-semibold tracking-wide animate__animated animate__fadeIn mt-8"}>{"Translation"}</h1>
    <p className={"animate__animated animate__fadeInDown animate__500ms mt-3"}>{"How to translate YourDash for other languages"}</p>

    <ComingSoon />
  </div>
);

export default Index;
