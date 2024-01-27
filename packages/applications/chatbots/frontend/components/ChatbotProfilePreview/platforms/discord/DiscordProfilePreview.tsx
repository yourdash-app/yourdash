/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
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
          <img className={styles.avatar} src={avatarUrl} />
          <div className={styles.status}></div>
        </div>
        <div className={styles.badges}></div>
      </div>
      <span>{displayName}</span>
      <span>{username}</span>
      <span>{status}</span>
      <p>{bio}</p>
      <section>
        {tryMyCommands.map((tag, index) => {
          return <div key={index}>{tag}</div>;
        })}
      </section>
    </div>
  );
};

export default DiscordProfilePreview;
