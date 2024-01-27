/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { Icon, YourDashIcon } from "web-client/src/ui/index";
import styles from "./DiscordProfilePreview.module.scss";

export interface IDiscordProfilePreviewProps {
  username: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
  status: string;
  tryMyCommands: string[];
}

const DiscordProfilePreview: React.FC<IDiscordProfilePreviewProps> = ({
  username,
  displayName,
  avatarUrl,
  bio,
  status,
  tryMyCommands,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.coloredSegment}></div>
        <div className={styles.avatarContainer}>
          <img alt={""} className={styles.avatar} src={avatarUrl} />
          <div className={styles.status} />
        </div>
        <div className={styles.badges}>
          <div className={styles.badge}>{"{/}"}</div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.name}>
          <span className={styles.displayName}>{displayName}</span>
          <span className={styles.username}>
            {username}
            <div className={styles.usernameBadge}>
              <Icon
                icon={YourDashIcon.Check}
                className={styles.usernameBadgeIcon}
              />
              BOT
            </div>
          </span>
        </div>
        <div className={styles.separator}></div>
        <button className={styles.addAppButton}>
          <Icon icon={YourDashIcon.PlusCircle} className={styles.addAppIcon} />
        </button>
        <span>{status}</span>
        <p>{bio}</p>
        <section>
          {tryMyCommands.map((tag, index) => {
            return <div key={index}>{tag}</div>;
          })}
        </section>
      </div>
    </div>
  );
};

export default DiscordProfilePreview;
