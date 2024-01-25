/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useState } from "react";
import DefaultStartupMenuPage from "./pages/default/DefaultStartupMenuPage";

export enum CHATBOTS_STARTUP_MENU_PAGE {
  DEFAULT,
  TUTORIAL,
  TERMS_AND_CONDITIONS,
}

export interface IStartupMenuPageProps {
  setMenuPage: (page: CHATBOTS_STARTUP_MENU_PAGE) => void;
}

const StartupMenu: React.FC = () => {
  const [menuPage, setMenuPage] = useState<CHATBOTS_STARTUP_MENU_PAGE>(
    CHATBOTS_STARTUP_MENU_PAGE.DEFAULT,
  );

  switch (menuPage) {
    case CHATBOTS_STARTUP_MENU_PAGE.DEFAULT:
      return <DefaultStartupMenuPage setMenuPage={setMenuPage} />;
    default:
      return <>UNKNOWN CHATBOTS_STARTUP_MENU_PAGE: {menuPage}</>;
  }
};

export default StartupMenu;
