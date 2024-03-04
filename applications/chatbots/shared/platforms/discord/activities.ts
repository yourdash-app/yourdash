/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { DiscordSnowflake } from "./snowflake";

export interface IDiscordActivityUser {
  Id: number;
  Username: string;
  Discriminator: string;
  Avatar: string;
  Bot: boolean;
}

export interface IDiscordActivityTimestamps {
  Start: number;
  End: number;
}

export interface IDiscordActivityAssets {
  // See Activity Asset Image
  largeImage?: string;
  // Text displayed when hovering over the large image of the activity
  largeText?: string;
  // See Activity Asset Image
  smallImage?: string;
  // Text displayed when hovering over the small image of the activity
  smallText?: string;
}

export interface IDiscordActivityParty {
  id: string;
  size: IDiscordPartySize;
}

export interface IDiscordPartySize {
  currentSize: number;
  maxSize: number;
}

export interface IDiscordActivitySecrets {
  match: string;
  join: string;
  spectate: string;
}

export interface IDiscordActivity {
  id: number;
  // Activity type
  type: number;
  // Application ID for the game
  applicationId: number;
  // Activity's name
  name: string;
  // User's current party status, or text used for a custom status
  state: string;
  // What the player is currently doing
  details: string;
  // Unix timestamps for start and/or end of the game
  timestamps: IDiscordActivityTimestamps;
  // Images for the presence and their hover texts
  assets: IDiscordActivityAssets;
  // Information for the current party of the player
  party: IDiscordActivityParty;
  // Secrets for Rich Presence joining and spectating
  secrets: IDiscordActivitySecrets;
  // Whether the activity is an instanced game session
  instance: boolean;
  // Stream URL, is validated when type is 1
  url?: string;
  // Emoji used for a custom status
  emoji?: string;
}

export enum DiscordActivityType {
  // Playing {name}
  Game = 0,
  // Streaming {details}
  Streaming = 1,
  // Listening to {name}
  Listening = 2,
  // Watching {name}
  Watching = 3,
  // {emoji} {state}
  Custom = 4,
  // Competing in {name}
  Competing = 5,
}

export enum DiscordActivityJoinRequestReply {
  No = 0,
  Yes = 1,
  Ignore = 2,
}

export enum DiscordActivityActivityType {
  Join = 0,
  Spectate = 1,
}

export enum DiscordActivityFlags {
  INSTANCE = 1 << 0,
  JOIN = 1 << 1,
  SPECTATE = 1 << 2,
  JOIN_REQUEST = 1 << 3,
  SYNC = 1 << 4,
  PLAY = 1 << 5,
  PARTY_PRIVACY_FRIENDS = 1 << 6,
  PARTY_PRIVACY_VOICE_CHANNEL = 1 << 7,
  EMBEDDED = 1 << 8,
}

// INFO: bot users are only able to set the following: name, state, type and url
export class DiscordActivity {
  // Activity's name
  name: string;
  // Activity type
  type: DiscordActivityType;
  // Stream URL, is validated when type is 1
  url?: string;
  // Unix timestamp (in milliseconds) of when the activity was added to the user's session
  createdAt: number;
  // Unix timestamps for start and/or end of the game
  timestamps: IDiscordActivityTimestamps;
  // Application ID for the game
  applicationId: DiscordSnowflake;
  // What the player is currently doing
  details?: string;
  // User's current party status, or text used for a custom status
  state?: string;
  // Emoji used for a custom status
  emoji?: DiscordEmoji;
  // Information for the current party of the player
  party?: DiscordParty;
  // Images for the presence and their hover texts
  assets?: IDiscordActivityAssets;
  // Secrets for Rich Presence joining and spectating
  secrets?: DiscordSecrets;
  // Whether the activity is an instanced game session
  instance?: boolean;
  // Activity flags ORd together, describes what the payload includes
  flags?: DiscordActivityFlags;
  // Custom buttons shown in the Rich Presence (max 2)
  buttons?: DiscordButton[];

  constructor(id: number) {
    this.id = id;
  }
}
