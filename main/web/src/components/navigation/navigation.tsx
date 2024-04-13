/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Box from "@yourdash/uikit/components/box/box.js";
import Heading from "@yourdash/uikit/components/heading/heading.js";
import Icon from "@yourdash/uikit/components/icon/icon.js";
import { UKIcon } from "@yourdash/uikit/components/icon/iconDictionary.js";
import Image from "@yourdash/uikit/components/image/image.js";
import TextButton from "@yourdash/uikit/components/textButton/textButton.js";
import { Component, ParentProps } from "solid-js";
import styles from "./navigation.module.scss";
import { useNavigate } from "@solidjs/router";

const Navigation: Component<ParentProps & { subtitle?: string }> = ({ children, subtitle }) => {
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
          text={subtitle ? `/ ${subtitle}` : ""}
        />
        <TextButton
          extraClass={styles.link}
          text={"Home"}
          onClick={() => {
            navigate("/");
          }}
        />
        <TextButton
          extraClass={styles.link}
          text={"Docs"}
          onClick={() => {
            navigate("/docs");
          }}
        />
        <TextButton
          extraClass={styles.link}
          text={"Source"}
          onClick={() => {
            window.location.href = "https://github.com/yourdash/yourdash";
          }}
        />
        <div class={styles.ewsgit}>
          <Icon
            icon={UKIcon.Ewsgit}
            extraClass={styles.ewsgitIcon}
            preserveColor
            size={"1.25rem"}
          />
        </div>
      </Box>
      {children}
    </div>
  );
};

export default Navigation;
