/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export default interface IPanelApplicationsLauncherFrontendModule {
  id: string;
  displayName: string;
  icon: string;
  description: string;
  endpoint?: string;
  url?: string;
  type: "frontend" | "externalFrontend";
}
