/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export function getAuthorizationCodeUrl(clientId: string, redirectionUrl: string, scopes: string[]) {
  return `https://discord.com/oauth2/authorize?response_type=code&client_id=${this.clientId}&scope=${scopes.join("%20")}&redirect_uri=${encodeURIComponent(redirectionUrl)}&prompt=consent`;
}

export default function getBotAuthorizationCodeUrl(clientId: string, redirectionUrl: string, permissions: number) {
  return `https://discord.com/oauth2/authorize?&client_id=${this.clientId}&scope=bot&permissions=${permissions}`;
}
