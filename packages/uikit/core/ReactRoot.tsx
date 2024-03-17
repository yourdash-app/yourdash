/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useEffect, useRef } from "react";
import UIKit from "./index";

const UIKitReactRoot: React.FC<{ onLoad: (fw: UIKit) => void }> = ({ onLoad }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      if (!window.__uikit__?.uikit) {
        const fw = new UIKit(ref.current);

        onLoad(fw);
        return;
      }

      // we have a uikit already,
      // so we don't need to create a new one
      window.__uikit__.uikit.contentRoot.setHTMLElement(ref.current);
      onLoad(window.__uikit__.uikit);
    }
  }, [ref.current]);

  return <div ref={ref}></div>;
};

export default UIKitReactRoot;
