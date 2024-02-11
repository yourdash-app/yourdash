/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useEffect } from "react";
import UIKitFramework, { UIKitFrameworkType } from "./index";

const UIKitFrameworkReactInterconnect: React.FC<{
  frameworkType: UIKitFrameworkType;
  onLoad: (element: UIKitFramework) => void;
}> = ({ frameworkType, onLoad }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current === null) {
      return;
    }

    const uikit = new UIKitFramework(frameworkType, ref.current);

    onLoad(uikit);
  }, []);

  return <div ref={ref}>UIKit Framework React Interconnect</div>;
};

export default UIKitFrameworkReactInterconnect;
