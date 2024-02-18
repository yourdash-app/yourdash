/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { DiscordSnowflake } from "./snowflake";

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
  id: DiscordSnowflake;
  name: string;
  icon?: string;
  description: string;
  rpc_origins?: string[];
  bot_public: boolean;
  bot_require_code_grant: boolean;
  bot?: DiscordPartialUser;
  terms_of_service_url?: string;
  privacy_policy_url?: string;
  owner?: DiscordPartialUser;
  summary: "";
  verify_key: string;
  team?: DiscordTeam;
  guild_id?: DiscordSnowflake;
  guild?: DiscordGuild;
  primary_sku_id?: DiscordSnowflake;
  slug?: string;
  cover_image?: string;
  flags: DiscordApplicationFlags;
  approximate_guild_count?: number;
  redirect_uris?: string[];
  interactions_endpoint_url?: string;
  role_connections_verification_url?: string;
  tags: string[];
  install_params?: IDiscordApplicationInstallParams;
  custom_install_url?: string;
}

export default class DiscordApplication implements IDiscordApplication {
  clientId: string;

  constructor() {
    this.clientId = "";

    return this;
  }
}
