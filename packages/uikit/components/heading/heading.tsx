/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Component } from "solid-js";
import styles from "./heading.module.scss";

const Heading: Component<{ text: string; level?: 1 | 2 | 3 | 4 | 5 | 6 }> = ({ text, level }) => {
  switch (level || 1) {
    case 1:
      return <h1 class={`${styles.component}`}>{text}</h1>;
    case 2:
      return <h2 class={`${styles.component}`}>{text}</h2>;
    case 3:
      return <h3 class={`${styles.component}`}>{text}</h3>;
    case 4:
      return <h4 class={`${styles.component}`}>{text}</h4>;
    case 5:
      return <h5 class={`${styles.component}`}>{text}</h5>;
    case 6:
      return <h6 class={`${styles.component}`}>{text}</h6>;
  }
};

export default Heading;
