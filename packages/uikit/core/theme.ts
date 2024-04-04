/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import theme from "./defaultTheme.module.scss";

export function getThemeMeta(element: HTMLElement) {
  element.classList.add(theme.theme);
}

export function loadThemeLevel(element: HTMLElement, levelName: 0 | 1 | 2 | 3) {
  if (!element) return;

  const themeLevels = {
    0: theme.level0,
    1: theme.level1,
    2: theme.level2,
    3: theme.level3,
  };

  element?.classList.add(theme.theme);
  element.classList.add(themeLevels[levelName]);

  return;
}

export { theme };
