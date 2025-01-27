/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import UKFlex from "@yourdash/uikit/src/components/flex/UKFlex.js";
import UKIconButton from "@yourdash/uikit/src/components/iconButton/UKIconButton.js";
import UKLink from "@yourdash/uikit/src/components/link/UKLink.js";
import UKSeparator from "@yourdash/uikit/src/components/separator/UKSeparator.js";
import UKText from "@yourdash/uikit/src/components/text/UKText.js";
import UKTextButton from "@yourdash/uikit/src/components/textButton/UKTextButton.js";
import { UKIcons } from "@yourdash/uikit/src/core/iconDictionary.js";
import styles from "./navigation.module.scss";
import React, { FC } from "react";
import { Outlet, useNavigate } from "react-router";
import UKImage from "@yourdash/uikit/src/components/image/UKImage.js";
import UKHeading from "@yourdash/uikit/src/components/heading/UKHeading.js";
import UKBox from "@yourdash/uikit/src/components/box/UKBox.js";

const Navigation: FC<{ subtitle?: string }> = ({ subtitle }) => {
  const navigate = useNavigate();

  return (
    <>
      <UKBox className={styles.navigationBar}>
        <UKImage
          src={"/assets/branding/yourdash.svg"}
          accessibleLabel={"YourDash Logo"}
          className={styles.logo}
        />
        <UKHeading
          level={2}
          className={styles.title}
          text={"YourDash"}
        />
        <UKHeading
          level={2}
          className={styles.subtitle}
          text={subtitle ? `/ ${subtitle}` : ""}
        />
        <UKTextButton
          className={styles.link}
          text={"Home"}
          onClick={() => {
            navigate("/");
          }}
        />
        <UKTextButton
          className={styles.link}
          text={"Docs"}
          onClick={() => {
            navigate("/docs");
          }}
        />
        <UKTextButton
          className={clippy(styles.link, styles.source)}
          text={"Source"}
          onClick={() => {
            window.location.href = "https://github.com/yourdash/yourdash";
          }}
        />
        <UKTextButton
          className={styles.link}
          text={"Login"}
          onClick={() => {
            navigate("/login");
          }}
        />
      </UKBox>
      <UKBox
        level={1}
        className={styles.notice}
      >
        <UKText text={"YourDash is a pre-alpha project. "} />
        <UKLink
          hideLinkIcon={true}
          to={"/docs/pre-alpha"}
          text={"learn more."}
        />
      </UKBox>
      <Outlet />
      <UKBox className={styles.footer}>
        <UKFlex
          className={styles.brand}
          direction={"row"}
        >
          <UKImage
            src={"/assets/branding/yourdash.svg"}
            accessibleLabel={"YourDash Logo"}
            className={styles.logo}
          />
          <UKHeading
            level={2}
            className={styles.name}
            text={"YourDash"}
          />
          <UKFlex
            direction={"row"}
            className={styles.socials}
          >
            <UKIconButton
              className={styles.icon}
              preserveColor
              accessibleLabel={"Ewsgit on GitHub"}
              icon={UKIcons.Ewsgit}
              onClick={() => {
                navigate("https://github.com/ewsgit");
              }}
            />
            <UKIconButton
              accessibleLabel={"YourDash on GitHub"}
              className={styles.icon}
              icon={UKIcons.LinkExternal}
              onClick={() => {
                navigate("");
              }}
            />
          </UKFlex>
        </UKFlex>
        <UKSeparator direction={"column"} />
        <UKFlex
          direction={"row"}
          className={styles.license}
        >
          <UKText text={"©2022-2024 Ewsgit and YourDash Contributors."} />
          <UKLink
            hideLinkIcon={true}
            to={"https://ewsgit.mit-license.org"}
            text={"Licensed under the MIT License"}
          />
        </UKFlex>
      </UKBox>
    </>
  );
};

export default Navigation;
