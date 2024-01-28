/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

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
  LargeImage: string;
  LargeText: string;
  SmallImage: string;
  SmallText: string;
}

export interface IDiscordActivityParty {
  Id: string;
  Size: IDiscordPartySize;
}

export interface IDiscordPartySize {
  CurrentSize: number;
  MaxSize: number;
}

export interface IDiscordActivitySecrets {
  Match: string;
  Join: string;
  Spectate: string;
}

export interface IDiscordActivity {
  Id: number;
  Type: number;
  ApplicationId: number;
  Name: string;
  State: string;
  Details: string;
  Timestamps: IDiscordActivityTimestamps;
  Assets: IDiscordActivityAssets;
  Party: IDiscordActivityParty;
  Secrets: IDiscordActivitySecrets;
  Instance: boolean;
}

export enum DiscordActivityType {
  Game = 0,
  Streaming = 1,
  Listening = 2,
  Watching = 3,
  Custom = 4,
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

export class DiscordActivity implements IDiscordActivity {
  Id: number;
  Type: number;
  ApplicationId: number;
  Name: string;
  State: string;
  Details: string;
  Timestamps: IDiscordActivityTimestamps;
  Assets: IDiscordActivityAssets;
  Party: IDiscordActivityParty;
  Secrets: IDiscordActivitySecrets;
  Instance: boolean;

  constructor(id: number) {
    this.Id = id;
  }
}
