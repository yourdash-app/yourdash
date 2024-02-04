/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Card, Icon, YourDashIcon } from "@yourdash/web-client/src/ui/index";
import styles from "./UserPreview.module.scss";

export interface IUserPreview {
  name: {
    first: string;
    last: string;
  };
  username: string;
  avatar: string;
  bio?: string;
  links?: { url: string; label: string }[];
}

const UserPreview: React.FC<IUserPreview> = ({ name, username, avatar, bio, links }) => {
  return (
    <Card className={styles.component}>
      <img src={avatar} alt="" className={styles.avatar} />
      <section className={styles.content}>
        <section className={styles.name}>
          <div className={styles.fullName}>
            {name.first} {name.last}
          </div>
          <div className={styles.username}>@{username}</div>
        </section>
        <p className={styles.bio}>{bio}</p>
        {!!links &&
          links.map((link) => (
            <a href={link.url} className={styles.link} key={link.label + link.url}>
              <Icon className={styles.icon} icon={YourDashIcon.Link} />
              {link.label}
            </a>
          ))}
      </section>
    </Card>
  );
};

export default UserPreview;
