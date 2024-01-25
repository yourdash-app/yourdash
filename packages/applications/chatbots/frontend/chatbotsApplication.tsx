/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import styles from "./chatbotsApplication.module.scss";
import StartupMenu from "./views/startupMenu/StartupMenu";

const ChatbotsApplication: React.FC = () => {
  return (
    <main className={styles.main}>
      <StartupMenu />
    </main>
  );
};

export default ChatbotsApplication;
