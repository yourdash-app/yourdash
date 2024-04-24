/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import csi from "@yourdash/csi/csi.js";
import Heading from "@yourdash/uikit/components/heading/heading.js";
import Spinner from "@yourdash/uikit/components/spinner/spinner.js";
import Subtext from "@yourdash/uikit/components/subtext/subtext.js";
import { Component, createResource } from "solid-js";
import styles from "./index.module.scss";

const LoginSuccessPage: Component = () => {
  const [fullName] = createResource(() => csi.getUser().getFullName());

  return (
    <div class={styles.page}>
      <Heading
        level={1}
        text={`Hiya, ${fullName()?.first || "Failure to load name"}!`}
        extraClass={styles.heading}
      />
      <Spinner />
      <Subtext
        text={"Loading YourDash..."}
        extraClass={styles.loadingText}
      />
    </div>
  );
};

export default LoginSuccessPage;
