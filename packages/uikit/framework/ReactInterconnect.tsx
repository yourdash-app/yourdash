/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useEffect } from "react";
import UIKitFramework from "./index";

const UIKitFrameworkReactInterconnect: React.FC<{ onLoad: (element: UIKitFramework) => void }> = ({ onLoad }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current === null) {
      return;
    }

    const uikit = new UIKitFramework(ref.current);

    onLoad(uikit);
  }, []);

  return <div ref={ref}>UIKit Framework React Interconnect</div>;
};

export default UIKitFrameworkReactInterconnect;
