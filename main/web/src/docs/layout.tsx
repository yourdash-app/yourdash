/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Box from "@yourdash/uikit/components/box/box.js";
import Heading from "@yourdash/uikit/components/heading/heading.js";
import Image from "@yourdash/uikit/components/image/image.js";
import TextButton from "@yourdash/uikit/components/textButton/textButton.js";
import { Component, ParentProps } from "solid-js";
import styles from "./layout.module.scss";
import { useNavigate } from "@solidjs/router";

const Layout: Component<ParentProps> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Box extraClass={styles.navigationBar}>
        <Image
          src={"/assets/branding/yourdash.svg"}
          accessibleLabel={"YourDash Logo"}
          extraClass={styles.logo}
        />
        <Heading
          level={2}
          extraClass={styles.title}
          text={"YourDash"}
        />
        <Heading
          level={2}
          extraClass={styles.subtitle}
          text={"Docs"}
        />
        <TextButton
          extraClass={styles.link}
          text={"Home"}
          onClick={() => {
            navigate("/");
          }}
        />
      </Box>
      {children}
    </div>
  );
};

export default Layout;
