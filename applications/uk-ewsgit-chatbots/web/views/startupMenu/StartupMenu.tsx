/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useState } from "react";
import DefaultStartupMenuPage from "./pages/default/DefaultStartupMenuPage";
import TutorialStartupMenuPage from "./pages/tutorial/TutorialStartupMenuPage";

export enum CHATBOTS_STARTUP_MENU_PAGE {
  DEFAULT,
  TUTORIAL,
  TERMS_AND_CONDITIONS,
}

export interface IStartupMenuPageProps {
  setMenuPage: (page: CHATBOTS_STARTUP_MENU_PAGE) => void;
}

const StartupMenu: React.FC = () => {
  const [menuPage, setMenuPage] = useState<CHATBOTS_STARTUP_MENU_PAGE>(CHATBOTS_STARTUP_MENU_PAGE.DEFAULT);

  switch (menuPage) {
    case CHATBOTS_STARTUP_MENU_PAGE.DEFAULT:
      return <DefaultStartupMenuPage setMenuPage={setMenuPage} />;
    case CHATBOTS_STARTUP_MENU_PAGE.TUTORIAL:
      return <TutorialStartupMenuPage setMenuPage={setMenuPage} />;

    default:
      return <>UNKNOWN CHATBOTS_STARTUP_MENU_PAGE: {menuPage}</>;
  }
};

export default StartupMenu;
