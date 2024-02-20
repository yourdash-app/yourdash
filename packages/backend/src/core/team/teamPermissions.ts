/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

enum YOURDASH_TEAM_PERMISSIONS {
  ADMINISTRATOR,
}

type YourDashTeamPermission = YOURDASH_TEAM_PERMISSIONS | string;

export type { YourDashTeamPermission };
