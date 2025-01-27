/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { LoginLayout } from "../../../core/login/loginLayout.js";

export default interface EndpointResponseLoginInstanceMetadata {
  title: string;
  message?: string;
  loginLayout: LoginLayout;
}
