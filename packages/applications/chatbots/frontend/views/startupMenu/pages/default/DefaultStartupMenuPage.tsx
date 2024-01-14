/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useState } from "react";
import {
  Heading,
  Icon,
  MajorButton,
  YourDashIcon,
} from "web-client/src/ui/index";
import {
  CHATBOTS_STARTUP_MENU_PAGE,
  IStartupMenuPageProps,
} from "../../StartupMenu";
import TutorialStartupMenuPage from "../tutorial/TutorialStartupMenuPage";
import styles from "./DefaultStartupMenuPage.module.scss";

const DefaultStartupMenuPage: React.FC<IStartupMenuPageProps> = ({
  setMenuPage,
}) => {
  const [completedTutorial, setCompletedTutorial] = useState<boolean>(false);
  const [acceptedTermsAndConditions, setAcceptedTermsAndConditions] =
    useState<boolean>(false);
  const [chatbots, setChatbots] = useState<string[]>([]);

  if (!completedTutorial) {
    return <TutorialStartupMenuPage setMenuPage={setMenuPage} />;
  }

  return (
    <>
      <Icon
        className={styles.logo}
        icon={YourDashIcon.YourDashLogo}
        preserveColor={true}
      />
      <Heading level={1}>YourDash Chatbots</Heading>
      <p className={styles.tagline}>
        Create and manage customised chatbots for external chat services
      </p>
      <section className={styles.options}>
        <MajorButton
          onClick={() => {
            setMenuPage(CHATBOTS_STARTUP_MENU_PAGE.DEFAULT);
          }}
        >
          Get Started
        </MajorButton>
      </section>
    </>
  );
};

export default DefaultStartupMenuPage;
