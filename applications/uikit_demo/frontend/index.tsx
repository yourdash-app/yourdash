/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UIKitFrameworkType } from "@yourdash/uikit/framework/index";
import UIKitFrameworkReactInterconnect from "@yourdash/uikit/framework/ReactInterconnect";
import * as React from "react";

const UIKitDemoApplication: React.FC = () => {
  return (
    <>
      <UIKitFrameworkReactInterconnect
        frameworkType={UIKitFrameworkType.HTML}
        onLoad={(fw) => {
          // do stuff
          return fw;
        }}
      />
    </>
  );
};

export default UIKitDemoApplication;
