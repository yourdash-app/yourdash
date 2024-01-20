/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { MajorButton } from "web-client/src/ui/index";
import {
  CHATBOTS_STARTUP_MENU_PAGE,
  IStartupMenuPageProps,
} from "../../StartupMenu";
import styles from "./TutorialStartupMenuPage.module.scss";

const TutorialStartupMenuPage: React.FC<IStartupMenuPageProps> = ({
  setMenuPage,
}) => {
  return (
    <div>
      <h1>Tutorial Page</h1>

      <div className={styles.options}>
        <MajorButton
          onClick={() => {
            setMenuPage(CHATBOTS_STARTUP_MENU_PAGE.DEFAULT);
          }}
        >
          Get Started
        </MajorButton>
      </div>
    </div>
  );
};

export default TutorialStartupMenuPage;
