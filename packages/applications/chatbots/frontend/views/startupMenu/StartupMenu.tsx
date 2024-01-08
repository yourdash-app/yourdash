/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useState } from "react";
import { MajorButton } from "web-client/src/ui/index";
import styles from "./StartupMenu.module.scss";

export enum CHATBOTS_STARTUP_MENU_PAGE {
  DEFAULT,
  TUTORIAL,
  TERMS_AND_CONDITIONS,
}

const StartupMenu: React.FC = () => {
  const [menuPage, setMenuPage] = useState<CHATBOTS_STARTUP_MENU_PAGE>(
    CHATBOTS_STARTUP_MENU_PAGE.DEFAULT,
  );
  const [completedTutorial, setCompletedTutorial] = useState<boolean>(false);
  const [acceptedTermsAndConditions, setAcceptedTermsAndConditions] =
    useState<boolean>(false);
  const [chatbots, setChatbots] = useState<string[]>([]);

  switch (menuPage) {
    case CHATBOTS_STARTUP_MENU_PAGE.DEFAULT:
      if (chatbots.length !== 0) {
        return <section className={styles.options}></section>;
      }

      return (
        <section className={styles.options}>
          <MajorButton
            onClick={() => {
              setMenuPage(CHATBOTS_STARTUP_MENU_PAGE.DEFAULT);
            }}
          >
            Get Started
          </MajorButton>
        </section>
      );
    default:
      return <>UNKNOWN CHATBOTS_STARTUP_MENU_PAGE: {menuPage}</>;
  }
};

export default StartupMenu;
