/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { NavBar } from "@yourdash/web-client/src/ui/index";
import { useEffect } from "react";

const ListBotsPage: React.FC = () => {
  useEffect(() => {
    // PERFORM DISCORD AUTH CHECKS
  }, []);

  return (
    <>
      <NavBar title={"View Your Bots"} showUserProfileDropdown></NavBar>
    </>
  );
};

export default ListBotsPage;
