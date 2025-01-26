/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
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
