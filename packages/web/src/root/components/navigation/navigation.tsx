/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import styles from "./navigation.module.scss";
import { FC } from "react";
import { Outlet, useNavigate } from "react-router";
import UK, { UKC } from "@yourdash/uikit";

const Navigation: FC<{ subtitle?: string }> = ({ subtitle }) => {
  const navigate = useNavigate();

  return (
    <>
      <UKC.Box className={styles.navigationBar}>
        <UKC.Image
          src={"/assets/branding/yourdash.svg"}
          accessibleLabel={"YourDash Logo"}
          className={styles.logo}
        />
        <UKC.Heading
          level={2}
          className={styles.title}
          text={"YourDash"}
        />
        <UKC.Heading
          level={2}
          className={styles.subtitle}
          text={subtitle ? `/ ${subtitle}` : ""}
        />
        <UKC.TextButton
          className={styles.link}
          text={"Home"}
          onClick={() => {
            navigate("/");
          }}
        />
        <UKC.TextButton
          className={styles.link}
          text={"Docs"}
          onClick={() => {
            navigate("/docs");
          }}
        />
        <UKC.TextButton
          className={clippy(styles.link, styles.source)}
          text={"Source"}
          onClick={() => {
            window.location.href = "https://github.com/yourdash/yourdash";
          }}
        />
        <UKC.TextButton
          className={styles.link}
          text={"Login"}
          onClick={() => {
            navigate("/login");
          }}
        />
      </UKC.Box>
      <UKC.Box
        level={1}
        className={styles.notice}
      >
        <UKC.Text text={"YourDash is a pre-alpha project. "} />
        <UKC.Link
          hideLinkIcon={true}
          to={"/docs/pre-alpha"}
          text={"learn more."}
        />
      </UKC.Box>
      <Outlet />
      <UKC.Box className={styles.footer}>
        <UKC.Flex
          className={styles.brand}
          direction={"row"}
        >
          <UKC.Image
            src={"/assets/branding/yourdash.svg"}
            accessibleLabel={"YourDash Logo"}
            className={styles.logo}
          />
          <UKC.Heading
            level={2}
            className={styles.name}
            text={"YourDash"}
          />
          <UKC.Flex
            direction={"row"}
            className={styles.socials}
          >
            <UKC.IconButton
              className={styles.icon}
              preserveColor
              accessibleLabel={"Ewsgit on GitHub"}
              icon={UK.Core.Icons.Ewsgit}
              onClick={() => {
                navigate("https://github.com/ewsgit");
              }}
            />
            <UKC.IconButton
              accessibleLabel={"YourDash on GitHub"}
              className={styles.icon}
              icon={UK.Core.Icons.LinkExternal}
              onClick={() => {
                navigate("");
              }}
            />
          </UKC.Flex>
        </UKC.Flex>
        <UKC.Separator direction={"column"} />
        <UKC.Flex
          direction={"row"}
          className={styles.license}
        >
          <UKC.Text text={"©2022-2024 Ewsgit and YourDash Contributors."} />
          <UKC.Link
            hideLinkIcon={true}
            to={"https://ewsgit.mit-license.org"}
            text={"Licensed under the MIT License"}
          />
        </UKC.Flex>
      </UKC.Box>
    </>
  );
};

export default Navigation;
