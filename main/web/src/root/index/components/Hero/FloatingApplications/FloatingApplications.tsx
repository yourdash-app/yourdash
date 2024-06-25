/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy";
import React from "react";
import FloatingApplication from "./FloatingApplication";

const IndexPageHeroApplications: React.FC = () => {
  return (
    <div
      className={clippy(
        "relative lg:flex hidden animate__animated animate__bounceInDown animate__500ms animate__duration_2000ms h-full invisible lg:visible",
      )}
    >
      <FloatingApplication src={"/assets/promo-apps/files.png"} position={0} />
      <FloatingApplication src={"/assets/promo-apps/organisation.png"} position={1} />
      <FloatingApplication src={"/assets/promo-apps/code_studio.png"} position={2} />
      <FloatingApplication src={"/assets/promo-apps/store.png"} position={3} />
    </div>
  );
};

export default IndexPageHeroApplications;
