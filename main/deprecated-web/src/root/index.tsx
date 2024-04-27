/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Component } from "solid-js";
import Hero from "./components/hero/hero.js";
import styles from "./index.module.scss";

const IndexPage: Component = () => {
  return (
    <div class={styles.page}>
      <Hero />
    </div>
  );
};

export default IndexPage;
