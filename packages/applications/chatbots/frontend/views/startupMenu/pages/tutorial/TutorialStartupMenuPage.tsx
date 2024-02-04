/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { Heading, MajorButton } from "@yourdash/web-client/src/ui/index";
import { CHATBOTS_STARTUP_MENU_PAGE, IStartupMenuPageProps } from "../../StartupMenu";
import styles from "./TutorialStartupMenuPage.module.scss";

const TutorialStartupMenuPage: React.FC<IStartupMenuPageProps> = ({ setMenuPage }) => {
  return (
    <div>
      <Heading className={styles.heading} level={1}>
        Welcome to YourDash Chatbots
      </Heading>

      <p className={styles.description}>
        YourDash Chatbots is an application for creating and managing chatbots across multiple social platforms.
      </p>

      <div className={styles.options}>
        <MajorButton
          onClick={() => {
            setMenuPage(CHATBOTS_STARTUP_MENU_PAGE.DEFAULT);
          }}
        >
          Continue
        </MajorButton>
      </div>
    </div>
  );
};

export default TutorialStartupMenuPage;
