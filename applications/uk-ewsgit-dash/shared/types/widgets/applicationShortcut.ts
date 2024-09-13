/**
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

interface IApplicationShortcutWidget {
  id: "applicationShortcut";
  data: {
    id: string;
    name: string;
    icon: string;
    url: string;
  };
}

export type { IApplicationShortcutWidget };
