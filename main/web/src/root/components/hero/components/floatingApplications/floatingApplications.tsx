/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy";
import React from "react";
import { Component } from "solid-js";
import Application from "./components/application.js";

const IndexPageHeroApplications: Component = () => {
  return (
    <div
      class={clippy(
        "relative lg:flex hidden animate__animated animate__bounceInDown animate__500ms animate__duration_2000ms h-full invisible lg:visible",
      )}
    >
      <Application
        src={"/assets/promo-apps/files.png"}
        position={0}
      />
      <Application
        src={"/assets/promo-apps/organisation.png"}
        position={1}
      />
      <Application
        src={"/assets/promo-apps/code_studio.png"}
        position={2}
      />
      <Application
        src={"/assets/promo-apps/store.png"}
        position={3}
      />
    </div>
  );
};

export default IndexPageHeroApplications;
