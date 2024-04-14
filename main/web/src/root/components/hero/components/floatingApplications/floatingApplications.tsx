/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy";
import React from "react";
import { Component } from "solid-js";
import Application from "./components/application.js";

import FILES_APPLICATION_ICON from "@yourdash/applications/files/icon.avif";
import ORGANISATION_APPLICATION_ICON from "@yourdash/applications/organisation/icon.avif";
import CODE_STUDIO_ICON from "@yourdash/applications/code_studio/icon.avif";
import STORE_APPLICATION_ICON from "@yourdash/applications/store/icon.avif";

const IndexPageHeroApplications: Component = () => {
  return (
    <div
      class={clippy(
        "relative lg:flex hidden animate__animated animate__bounceInDown animate__500ms animate__duration_2000ms h-full invisible lg:visible",
      )}
    >
      <Application
        src={FILES_APPLICATION_ICON}
        position={0}
      />
      <Application
        src={ORGANISATION_APPLICATION_ICON}
        position={1}
      />
      <Application
        src={CODE_STUDIO_ICON}
        position={2}
      />
      <Application
        src={STORE_APPLICATION_ICON}
        position={3}
      />
    </div>
  );
};

export default IndexPageHeroApplications;
