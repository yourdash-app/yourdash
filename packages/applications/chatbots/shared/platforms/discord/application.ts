/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

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
  flags: number;
  approximate_guild_count?: number;
  redirect_uris?: string[];
  interactions_endpoint_url?: string;
  role_connections_verification_url?: string;
  tags: string[];
  install_params?: DiscordApplicationInstallParams;
  custom_install_url?: string;
}

export default class DiscordApplication implements IDiscordApplication {
  constructor() {
    return this;
  }
}
