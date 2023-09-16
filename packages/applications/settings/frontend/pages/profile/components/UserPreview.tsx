/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Card } from "web-client/src/ui/index";
import styles from "./UserPreview.module.scss"

export interface IUserPreview {
  name: {
    first: string,
    last: string
  },
  username: string,
  avatar: string,
  bio?: string,
  url?: string
}

const UserPreview: React.FC<IUserPreview> = ( { name, username, avatar, bio, url } ) => {
  return <Card>
    <img
      src={avatar}
      alt=""
      className={styles.avatar}
    />
    <div>
      <span>{name.first}</span>
      <span>{name.last}</span>
    </div>
    <div>@{username}</div>
    <div>{bio}</div>
    <a href={url}>{ url }</a>
  </Card>
}

export default UserPreview;