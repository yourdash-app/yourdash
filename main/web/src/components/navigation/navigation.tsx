/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Box from "@yourdash/uikit/components/box/box.js";
import Flex from "@yourdash/uikit/components/flex/flex.js";
import Heading from "@yourdash/uikit/components/heading/heading.js";
import { UKIcon } from "@yourdash/uikit/components/icon/iconDictionary.js";
import IconButton from "@yourdash/uikit/components/iconButton/iconButton.js";
import Image from "@yourdash/uikit/components/image/image.js";
import Link from "@yourdash/uikit/components/link/link.js";
import Separator from "@yourdash/uikit/components/separator/separator.js";
import Text from "@yourdash/uikit/components/text/text.js";
import TextButton from "@yourdash/uikit/components/textButton/textButton.js";
import { Component, ParentProps } from "solid-js";
import styles from "./navigation.module.scss";
import { useNavigate } from "@solidjs/router";

const Navigation: Component<ParentProps & { subtitle?: string }> = ({ children, subtitle }) => {
  const navigate = useNavigate();

  return (
    <>
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
        <TextButton
          extraClass={styles.link}
          text={"Login"}
          onClick={() => {
            navigate("/login");
          }}
        />
      </Box>
      <Box
        level={1}
        extraClass={styles.notice}
      >
        <Text text={"YourDash is a pre-alpha project. "} />
        <Link
          to={"javascript:void(0)"}
          text={"Learn more"}
        />
      </Box>
      {children}
      <Box extraClass={styles.footer}>
        <Flex
          extraClass={styles.brand}
          direction={"row"}
        >
          <Image
            src={"/assets/branding/yourdash.svg"}
            accessibleLabel={"YourDash Logo"}
            extraClass={styles.logo}
          />
          <Heading
            level={2}
            extraClass={styles.name}
            text={"YourDash"}
          />
          <Flex
            direction={"row"}
            extraClass={styles.socials}
          >
            <IconButton
              extraClass={styles.icon}
              preserveColor
              accessibleLabel={"Ewsgit on GitHub"}
              icon={UKIcon.Ewsgit}
              onClick={() => {
                navigate("https://github.com/ewsgit");
              }}
            />
            <IconButton
              accessibleLabel={"YourDash on GitHub"}
              extraClass={styles.icon}
              icon={UKIcon.LinkExternal}
              onClick={() => {
                navigate("");
              }}
            />
          </Flex>
        </Flex>
        <Separator direction={"column"} />
        <Flex
          direction={"row"}
          extraClass={styles.license}
        >
          <Text text={"©2022-2024 Ewsgit and YourDash Contributors."} />
          <Link
            to={"https://ewsgit.mit-license.org"}
            text={"Licensed under the MIT License"}
          />
        </Flex>
      </Box>
    </>
  );
};

export default Navigation;
