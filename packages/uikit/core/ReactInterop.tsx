/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useEffect, useRef } from "react";
import ContentRoot from "./contentRoot";
import UIKit from "./index";

const UIKitReactInterop: React.FC<{ onLoad: (contentRoot: ContentRoot) => void }> = ({ onLoad }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const contentRoot = new ContentRoot();
      onLoad(contentRoot);
    }
  }, [ref.current]);

  return <div ref={ref} />;
};

export default UIKitReactInterop;
