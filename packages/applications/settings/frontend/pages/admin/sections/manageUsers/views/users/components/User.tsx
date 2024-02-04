/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { Card } from "@yourdash/web-client/src/ui/index";
import styles from "./User.module.scss";

export interface IUser {
  username: string;
  avatar: string;
  name: { first: string; last: string };
}

const User: React.FC<IUser> = ({ username, avatar, name }) => {
  return (
    <Card className={styles.component}>
      <img className={styles.avatar} src={avatar} alt={"user's avatar"} />
      <div className={styles.name}>
        name: {name.first}, {name.last}
      </div>
      <div className={styles.username}>username: {username}</div>
    </Card>
  );
};

export default User;
