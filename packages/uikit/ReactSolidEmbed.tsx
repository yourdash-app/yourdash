/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { useEffect, useRef } from "react";
import { Component } from "solid-js";
import { render } from "solid-js/web";

// @ts-ignore
const ReactSolidEmbed: React.FC<{ component: Component }> = (props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      render(() => <props.component />, ref.current!);
    }
  }, []);

  // @ts-ignore
  return <div ref={ref} />;
};

export default ReactSolidEmbed;
