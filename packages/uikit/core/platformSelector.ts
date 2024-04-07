/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { AnyComponentOrHTMLElement } from "./component/type.js";

export default function platformSelector(desktop: () => AnyComponentOrHTMLElement, mobile: () => AnyComponentOrHTMLElement): AnyComponentOrHTMLElement {
  const isMobile = window.__uikit__.isMobile;

  if (isMobile) return mobile();

  return desktop();
}
