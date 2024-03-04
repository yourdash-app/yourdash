/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { USER_AVATAR_SIZE } from "@yourdash/shared/core/userAvatarSize";
import * as React from "react";
import csi from "../../../../../../../csi/csi";
import styles from "./UserProfileDropdown.module.scss";
import { useEffect, useState } from "react";

const UserProfileDropdown: React.FC = () => {
  const [userAvatar, setUserAvatar] = useState<string>("");
  const [userFullName, setUserFullName] = useState<{ first: string; last: string }>({ first: "Unknown", last: "User" });
  const [userName, setUserName] = useState<string>("unknown");

  useEffect(() => {
    const user = csi.getUser();

    user.getAvatar(USER_AVATAR_SIZE.SMALL).then((res) => {
      setUserAvatar(res);
    });
    user.getFullName().then((res) => {
      setUserFullName(res);
    });
    setUserName(csi.getUserName());
  }, []);

  return (
    <div className={styles.component}>
      <img className={styles.avatar} src={userAvatar} alt={""} />
      <div className={styles.nameContainer}>
        <div className={styles.name}>
          {userFullName.first} {userFullName.last}
        </div>
        <div className={styles.username}>{userName}</div>
      </div>
    </div>
  );
};

export default UserProfileDropdown;
