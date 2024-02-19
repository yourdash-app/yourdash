/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { DiscordSnowflake } from "./snowflake";
import DiscordUser, { IDiscordUser } from "./user";

export enum DiscordApplicationFlags {
  // Indicates if an app uses the Auto Moderation API
  APPLICATION_AUTO_MODERATION_RULE_CREATE_BADGE = 1 << 0,
  // Intent required for bots in 100 or more servers to receive presence_update events
  GATEWAY_PRESENCE = 1 << 12,
  // Intent required for bots in under 100 servers to receive presence_update events, found on the Bot page in your app's settings
  GATEWAY_PRESENCE_LIMITED = 1 << 13,
  // Intent required for bots in 100 or more servers to receive member-related events like guild_member_add. See the list of member-related events under GUILD_MEMBERS
  GATEWAY_GUILD_MEMBERS = 1 << 14,
  // Intent required for bots in under 100 servers to receive member-related events like guild_member_add, found on the Bot page in your app's settings. See the list of member-related events under GUILD_MEMBERS
  GATEWAY_GUILD_MEMBERS_LIMITED = 1 << 15,
  // Indicates unusual growth of an app that prevents verification
  VERIFICATION_PENDING_GUILD_LIMIT = 1 << 16,
  // Indicates if an app is embedded within the Discord client (currently unavailable publicly)
  EMBEDDED = 1 << 17,
  // Intent required for bots in 100 or more servers to receive message content
  GATEWAY_MESSAGE_CONTENT = 1 << 18,
  // Intent required for bots in under 100 servers to receive message content, found on the Bot page in your app's settings
  GATEWAY_MESSAGE_CONTENT_LIMITED = 1 << 19,
  // Indicates if an app has registered global application commands
  APPLICATION_COMMAND_BADGE = 1 << 26,
}

export interface IDiscordApplicationInstallParams {
  // Scopes to add the application to the server with
  scopes: string[];

  // Permissions to request for the bot role
  permissions: string;
}

export interface IDiscordApplication {
  // ID of the app
  id: DiscordSnowflake;
  // Name of the app
  name: string;
  // Icon hash of the app
  icon?: string;
  // Description of the app
  description: string;
  // List of RPC origin URLs, if RPC is enabled
  rpc_origins?: string[];
  // When false, only the app owner can add the app to guilds
  bot_public: boolean;
  // When true, the app's bot will only join upon completion of the full OAuth2 code grant flow
  bot_require_code_grant: boolean;
  // Partial user object for the bot user associated with the app
  bot?: IDiscordUser;
  // URL of the app's Terms of Service
  terms_of_service_url?: string;
  // URL of the app's Privacy Policy
  privacy_policy_url?: string;
  // Partial user object for the owner of the app
  owner?: IDiscordUser;
  // Deprecated and will be removed in v11. An empty string.
  summary: "";
  // Hex encoded key for verification in interactions and the GameSDK's GetTicket
  verify_key: string;
  // If the app belongs to a team, this will be a list of the members of that team
  team?: IDiscordTeam;
  // Guild associated with the app. For example, a developer support server.
  guild_id?: DiscordSnowflake;
  // Partial object of the associated guild
  guild?: IDiscordGuild;
  // If this app is a game sold on Discord, this field will be the id of the "Game SKU" that is created, if exists
  primary_sku_id?: DiscordSnowflake;
  // If this app is a game sold on Discord, this field will be the URL slug that links to the store page
  slug?: string;
  // App's default rich presence invite cover image hash
  cover_image?: string;
  // App's public flags
  flags: DiscordApplicationFlags;
  // Approximate count of guilds the app has been added to
  approximate_guild_count?: number;
  // Array of redirect URIs for the app
  redirect_uris?: string[];
  // Interactions endpoint URL for the app
  interactions_endpoint_url?: string;
  // Role connection verification URL for the app
  role_connections_verification_url?: string;
  // List of tags describing the content and functionality of the app. Max of 5 tags.
  tags: string[];
  // Settings for the app's default in-app authorization link, if enabled
  install_params?: IDiscordApplicationInstallParams;
  // Default custom authorization URL for the app, if enabled
  custom_install_url?: string;
}

export default class DiscordApplication {
  applicationToken: string;
  clientId: string;
  // ID of the app
  id: DiscordSnowflake;
  // Name of the app
  name: string;
  // Icon hash of the app
  icon?: string;
  // Description of the app
  description: string;
  // List of RPC origin URLs, if RPC is enabled
  rpc_origins?: string[];
  // When false, only the app owner can add the app to guilds
  bot_public: boolean;
  // When true, the app's bot will only join upon completion of the full OAuth2 code grant flow
  bot_require_code_grant: boolean;
  // Partial user object for the bot user associated with the app
  bot?: DiscordUser;
  // URL of the app's Terms of Service
  terms_of_service_url?: string;
  // URL of the app's Privacy Policy
  privacy_policy_url?: string;
  // Partial user object for the owner of the app
  owner?: DiscordUser;
  // Deprecated and will be removed in v11. An empty string.
  summary: "";
  // Hex encoded key for verification in interactions and the GameSDK's GetTicket
  verify_key: string;
  // If the app belongs to a team, this will be a list of the members of that team
  team?: DiscordTeam;
  // Guild associated with the app. For example, a developer support server.
  guild_id?: DiscordSnowflake;
  // Partial object of the associated guild
  guild?: DiscordGuild;
  // If this app is a game sold on Discord, this field will be the id of the "Game SKU" that is created, if exists
  primary_sku_id?: DiscordSnowflake;
  // If this app is a game sold on Discord, this field will be the URL slug that links to the store page
  slug?: string;
  // App's default rich presence invite cover image hash
  cover_image?: string;
  // App's public flags
  flags: DiscordApplicationFlags;
  // Approximate count of guilds the app has been added to
  approximate_guild_count?: number;
  // Array of redirect URIs for the app
  redirect_uris?: string[];
  // Interactions endpoint URL for the app
  interactions_endpoint_url?: string;
  // Role connection verification URL for the app
  role_connections_verification_url?: string;
  // List of tags describing the content and functionality of the app. Max of 5 tags.
  tags: string[];
  // Settings for the app's default in-app authorization link, if enabled
  install_params?: IDiscordApplicationInstallParams;
  // Default custom authorization URL for the app, if enabled
  custom_install_url?: string;

  constructor(applicationToken: string) {
    this.applicationToken = applicationToken;
    this.clientId = "";

    return this;
  }
}
