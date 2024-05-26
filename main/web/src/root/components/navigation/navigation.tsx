/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy";
import Box from "@yourdash/uikit/components/box/box";
import Flex from "@yourdash/uikit/components/flex/flex";
import Heading from "@yourdash/uikit/components/heading/heading";
import { UKIcon } from "@yourdash/uikit/components/icon/iconDictionary";
import IconButton from "@yourdash/uikit/components/iconButton/iconButton";
import Image from "@yourdash/uikit/components/image/image";
import Link from "@yourdash/uikit/components/link/link";
import Separator from "@yourdash/uikit/components/separator/separator";
import Text from "@yourdash/uikit/components/text/text";
import TextButton from "@yourdash/uikit/components/textButton/textButton";
import styles from "./navigation.module.scss";
import { FC } from "react";
import { Outlet, useNavigate } from "react-router";

const Navigation: FC<{ subtitle?: string }> = ({ subtitle }) => {
  const navigate = useNavigate();

  return (
    <>
      <Box className={styles.navigationBar}>
        <Image
          disableSpinner={true}
          src={"/assets/branding/yourdash.svg"}
          accessibleLabel={"YourDash Logo"}
          className={styles.logo}
        />
        <Heading
          level={2}
          className={styles.title}
          text={"YourDash"}
        />
        <Heading
          level={2}
          className={styles.subtitle}
          text={subtitle ? `/ ${subtitle}` : ""}
        />
        <TextButton
          className={styles.link}
          text={"Home"}
          onClick={() => {
            navigate("/");
          }}
        />
        <TextButton
          className={styles.link}
          text={"Docs"}
          onClick={() => {
            navigate("/docs");
          }}
        />
        <TextButton
          className={clippy(styles.link, styles.source)}
          text={"Source"}
          onClick={() => {
            window.location.href = "https://github.com/yourdash/yourdash";
          }}
        />
        <TextButton
          className={styles.link}
          text={"Login"}
          onClick={() => {
            navigate("/login");
          }}
        />
      </Box>
      <Box
        level={1}
        className={styles.notice}
      >
        <Text text={"YourDash is a pre-alpha project. "} />
        <Link
          to={"/"}
          text={"Learn more"}
        />
      </Box>
      <Outlet />
      <Box className={styles.footer}>
        <Flex
          className={styles.brand}
          direction={"row"}
        >
          <Image
            disableSpinner={true}
            src={"/assets/branding/yourdash.svg"}
            accessibleLabel={"YourDash Logo"}
            className={styles.logo}
          />
          <Heading
            level={2}
            className={styles.name}
            text={"YourDash"}
          />
          <Flex
            direction={"row"}
            className={styles.socials}
          >
            <IconButton
              className={styles.icon}
              preserveColor
              accessibleLabel={"Ewsgit on GitHub"}
              icon={UKIcon.Ewsgit}
              onClick={() => {
                navigate("https://github.com/ewsgit");
              }}
            />
            <IconButton
              accessibleLabel={"YourDash on GitHub"}
              className={styles.icon}
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
          className={styles.license}
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
