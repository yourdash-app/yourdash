/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import UsersView from "./views/users/UsersView";

const ManageUsers: React.FC = () => {
  const [ currentView, setCurrentView ] = React.useState<"createUser" | "usersView" | "manageUser">( "usersView" )

  switch ( currentView ) {
  case "createUser":
    return (
      <>WIP</>
    )
  case "usersView":
    return (
      <UsersView />
    )
  case "manageUser":
    return (
      <>WIP</>
    )
  }
};

export default ManageUsers;
