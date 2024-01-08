/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { Heading, Icon, YourDashIcon } from "web-client/src/ui/index";
import styles from "./chatbotsApplication.module.scss";
import StartupMenu from "./views/startupMenu/StartupMenu";

const ChatbotsApplication: React.FC = () => {
  return (
    <main className={styles.main}>
      <Icon
        className={styles.logo}
        icon={YourDashIcon.YourDashLogo}
        preserveColor={true}
      />
      <Heading level={1}>YourDash Chatbots</Heading>
      <p className={styles.tagline}>
        Create and manage customised chatbots for external chat services
      </p>
      <StartupMenu />
    </main>
  );
};

export default ChatbotsApplication;
