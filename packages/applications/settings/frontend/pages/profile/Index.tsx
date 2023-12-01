/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useEffect } from "react";
import csi from "web-client/src/helpers/csi";
import BasePageLayout from "../../components/BasePageLayout"
import UserPreview, { IUserPreview } from "./components/UserPreview";

const ProfileIndexPage: React.FC = () => {
  const [userData, setUserData] = React.useState<IUserPreview>( {
    name: { first: "Admin", last: "Istrator" },
    avatar: "abc",
    username: "admin",
    bio: "This is the user's sample bio",
    link: { url: "https://github.com/yourdash-app/yourdash", label: "Click me" }
  } )

  useEffect( () => {
    // get the user's data
    csi.getText( "/core/user/current/avatar/original", ( resp: string ) => {
      setUserData( { ...userData, avatar: `${csi.getInstanceUrl()}${resp}` } )
    } )
  }, [] )

  return <BasePageLayout
    title={"Profile"}
  >
    <UserPreview
      name={userData.name}
      avatar={userData.avatar}
      username={userData.username}
      bio={userData.bio}
      link={userData.link}
    />
  </BasePageLayout>
}

export default ProfileIndexPage
