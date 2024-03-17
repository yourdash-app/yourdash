/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useEffect, useRef } from "react";
import ContentRoot from "./contentRoot";

const UIKitReactInterop: React.FC<{ onLoad: (contentRoot: ContentRoot) => void }> = ({ onLoad }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      if (!window.__uikit__?.uikit) {
        console.error("UIKit is not yet loaded on this page");

        return;
      }

      const contentRoot = window.__uikit__.uikit.createLooseContentRoot({ htmlElement: ref.current });
      contentRoot.setHTMLElement(ref.current);

      onLoad(contentRoot);
    }
  }, [ref.current]);

  return <div ref={ref} />;
};

export default UIKitReactInterop;
