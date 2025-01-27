/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Icon from "@yourdash/chiplet/components/icon/Icon";
import { UKIcon } from "packages/uikit/src/core/iconDictionary.ts";
import React from "react";
import styles from "./DiscordProfilePreview.module.scss";

export interface IDiscordProfilePreviewProps {
  username: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
  tryMyCommands: string[];
  discriminator: string;
  showAddApplicationButton?: boolean;
}

const DiscordProfilePreview: React.FC<IDiscordProfilePreviewProps> = ({
  username,
  displayName,
  avatarUrl,
  bio,
  tryMyCommands,
  discriminator,
  showAddApplicationButton,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.coloredSegment}></div>
        <div className={styles.avatarContainer}>
          <img
            alt={""}
            className={styles.avatar}
            src={avatarUrl === "internal://ServerError" ? "/assets/productLogos/yourdash.svg" : avatarUrl}
          />
          <div className={styles.status} />
        </div>
        <div className={styles.badges}>
          <div className={styles.badge}>{"{/}"}</div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.name}>
          <span className={styles.displayName}>{displayName || "Unknown Bot"}</span>
          <span className={styles.username}>
            {!discriminator && "@"}
            {username || "unknown"}
            {discriminator && `#${discriminator}`}
            <div className={styles.usernameBadge}>
              <Icon
                icon={UKIcons.Check}
                className={styles.usernameBadgeIcon}
              />
              BOT
            </div>
          </span>
        </div>
        <div className={styles.separator}></div>
        {showAddApplicationButton && (
          <button className={styles.addAppButton}>
            <Icon
              icon={UKIcons.PlusCircle}
              className={styles.addAppIcon}
            />
            Add App
          </button>
        )}
        {bio && (
          <>
            <h3 className={styles.sectionHeader}>ABOUT ME</h3>
            <p className={styles.bio}>{bio}</p>
          </>
        )}
        {/* {presence.activities[0] && <div className={styles.status}>{presence.activities[0].state}</div>} */}
        <h3 className={styles.sectionHeader}>TRY MY COMMANDS</h3>
        <section className={styles.tryMyCommands}>
          {tryMyCommands.map((tag) => {
            return (
              <div
                className={styles.command}
                key={tag}
              >
                /{tag}
              </div>
            );
          })}
        </section>
        <h3 className={styles.sectionHeader}>NOTE</h3>
        <div className={styles.clickToAddNote}>
          <span className={styles.text}>Click to add a note</span>
        </div>
        <input
          className={styles.message}
          type={"text"}
          placeholder={`Message @${username}`}
        />
      </div>
    </div>
  );
};
export default DiscordProfilePreview;
