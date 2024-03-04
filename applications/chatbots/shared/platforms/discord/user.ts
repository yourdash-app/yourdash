/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { DiscordSnowflake } from "./snowflake";

export enum DiscordUserFlags {
  // Discord Employee
  STAFF = 1 << 0,
  // Partnered Server Owner
  PARTNER = 1 << 1,
  // HypeSquad Events Member
  HYPESQUAD = 1 << 2,
  // Bug Hunter Level 1
  BUG_HUNTER_LEVEL_1 = 1 << 3,
  // House Bravery Member
  HYPESQUAD_ONLINE_HOUSE_1 = 1 << 6,
  // House Brilliance Member
  HYPESQUAD_ONLINE_HOUSE_2 = 1 << 7,
  // House Balance Member
  HYPESQUAD_ONLINE_HOUSE_3 = 1 << 8,
  // Early Nitro Supporter
  PREMIUM_EARLY_SUPPORTER = 1 << 9,
  // User is a team
  TEAM_PSEUDO_USER = 1 << 10,
  // Bug Hunter Level 2
  BUG_HUNTER_LEVEL_2 = 1 << 14,
  // Verified Bot
  VERIFIED_BOT = 1 << 16,
  // Early Verified Bot Developer
  VERIFIED_DEVELOPER = 1 << 17,
  // Moderator Programs Alumni
  CERTIFIED_MODERATOR = 1 << 18,
  // Bot uses only HTTP interactions and is shown in the online member list
  BOT_HTTP_INTERACTIONS = 1 << 19,
  // User is an Active Developer
  ACTIVE_DEVELOPER = 1 << 22,
}

export enum DiscordPremiumType {
  None,
  NitroClassic,
  Nitro,
  NitroBasic,
}

export const DiscordConnectionServiceValues = [
  "battlenet",
  "ebay",
  "epicgames",
  "facebook",
  "github",
  "instagram",
  "leagueoflegends",
  "paypal",
  "playstation",
  "reddit",
  "riotgames",
  "spotify",
  "skype", // deprecated
  "steam",
  "tiktok",
  "twitch",
  "twitter",
  "xbox",
  "youtube",
];

export interface IDiscordUserConnection {
  id: string;
  name: string;
  type: keyof typeof DiscordConnectionServiceValues;
  revoked?: boolean;
  integrations?: number[];
  verified: boolean;
  friend_sync: boolean;
  show_activity: boolean;
  two_way_link: boolean;
  visibility: number;
}

export interface IDiscordUser {
  id: DiscordSnowflake;
  username: string;
  discriminator: string;
  avatar?: string;
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
  banner?: string;
  accent_color?: number;
  locale?: string;
  verified?: boolean;
  email?: string;
  flags?: number;
  premium_type?: number;
  public_flags?: number;
  avatar_decoration?: string;
}

export default class DiscordUser {
  is: DiscordSnowflake;
  username: string;
  discriminator: string;
  avatar?: string;
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
  banner?: string;
  accent_color?: number;
  locale?: string;
  verified?: boolean;
  email?: string;
  flags?: number;
  premium_type?: number;
  public_flags?: number;
  avatar_decoration?: string;

  constructor() {
    return this;
  }
}
