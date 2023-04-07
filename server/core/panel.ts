import fs from "fs";
import YourDashUser from "./user.js";
import path from "path";
import { base64DataUrl } from "./base64.js";

export interface YourDashPanelQuickShortcut {
  displayName: string;
  url: string;
  icon: string;
}

export default class YourDashPanel {
  username: string;

  constructor(username: string) {
    this.username = username;
    return this;
  }

  getQuickShortcuts() {
    let user = new YourDashUser(this.username);
    return JSON.parse(
      fs
        .readFileSync(path.resolve(user.getPath(), `./quick-shortcuts`))
        .toString()
    );
  }

  createQuickShortcut(displayName: string, url: string, icon: string): this {
    let user = new YourDashUser(this.username);

    try {
      let quickShortcuts: YourDashPanelQuickShortcut[] = JSON.parse(
        fs
          .readFileSync(path.resolve(user.getPath(), `./quick-shortcuts.json`))
          .toString()
      );

      quickShortcuts.push({
        url,
        displayName,
        icon,
      });

      fs.writeFileSync(
        path.resolve(user.getPath(), `./quick-shortcuts.json`),
        JSON.stringify(quickShortcuts)
      );
    } catch (err) {
      return this;
    }
  }

  createQuickShortcutFromFile(
    displayName: string,
    url: string,
    icon: Buffer
  ): this {
    let user = new YourDashUser(this.username);

    try {
      let quickShortcuts: YourDashPanelQuickShortcut[] = JSON.parse(
        fs
          .readFileSync(path.resolve(user.getPath(), `./quick-shortcuts.json`))
          .toString()
      );

      quickShortcuts.push({
        url,
        displayName,
        icon: base64DataUrl(icon.toString("base64")),
      });

      fs.writeFileSync(
        path.resolve(user.getPath(), `./quick-shortcuts.json`),
        JSON.stringify(quickShortcuts)
      );
    } catch (err) {
      return this;
    }
  }
}
