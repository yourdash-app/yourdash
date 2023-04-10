import fs from "fs";
import YourDashUser from "./user.js";
import path from "path";
import { base64ToDataUrl } from "./base64.js";

export interface YourDashPanelQuickShortcut {
  displayName: string;
  url: string;
  icon: string;
}

export enum YourDashPanelPosition {
  left,
  top,
  right,
  bottom,
}

export enum YourDashPanelLauncherType {
  popOut,
  slideOut,
}

export default class YourDashPanel {
  username: string;

  constructor(username: string) {
    this.username = username;
    return this;
  }

  getQuickShortcuts(): YourDashPanelQuickShortcut[] {
    let user = new YourDashUser(this.username);

    try {
      if (
        !fs.existsSync(path.resolve(user.getPath(), `./quick-shortcuts.json`))
      ) {
        fs.writeFileSync(
          path.resolve(user.getPath(), `./quick-shortcuts.json`),
          "[]"
        );
      }

      return JSON.parse(
        fs
          .readFileSync(path.resolve(user.getPath(), `./quick-shortcuts.json`))
          .toString()
      );
    } catch (err) {
      return [];
    }
  }

  removeQuickShortcut(index: number): this {
    let user = new YourDashUser(this.username);

    try {
      if (
        !fs.existsSync(path.resolve(user.getPath(), `./quick-shortcuts.json`))
      ) {
        fs.writeFileSync(
          path.resolve(user.getPath(), `./quick-shortcuts.json`),
          "[]"
        );
      }

      let quickShortcuts: YourDashPanelQuickShortcut[] = JSON.parse(
        fs
          .readFileSync(path.resolve(user.getPath(), `./quick-shortcuts.json`))
          .toString()
      );

      quickShortcuts = quickShortcuts.filter((sc, ind) => ind !== index);

      fs.writeFileSync(
        path.resolve(user.getPath(), `./quick-shortcuts.json`),
        JSON.stringify(quickShortcuts)
      );
    } catch (err) {
      return this;
    }

    return this;
  }

  createQuickShortcut(displayName: string, url: string, icon: Buffer): this {
    let user = new YourDashUser(this.username);

    try {
      if (
        !fs.existsSync(path.resolve(user.getPath(), `./quick-shortcuts.json`))
      ) {
        fs.writeFileSync(
          path.resolve(user.getPath(), `./quick-shortcuts.json`),
          "[]"
        );
      }

      let quickShortcuts: YourDashPanelQuickShortcut[] = JSON.parse(
        fs
          .readFileSync(path.resolve(user.getPath(), `./quick-shortcuts.json`))
          .toString()
      );

      if (
        quickShortcuts.filter((shortcut) => shortcut.url === url).length !== 0
      )
        return this;

      quickShortcuts.push({
        url,
        displayName,
        icon: base64ToDataUrl(icon.toString("base64")),
      });

      fs.writeFileSync(
        path.resolve(user.getPath(), `./quick-shortcuts.json`),
        JSON.stringify(quickShortcuts)
      );
    } catch (err) {
      return this;
    }

    return this;
  }

  setPanelPosition(position: YourDashPanelPosition): this {
    let user = new YourDashUser(this.username);

    try {
      if (!fs.existsSync(path.resolve(user.getPath(), `./panel.json`))) {
        fs.writeFileSync(
          path.resolve(user.getPath(), `./panel.json`),
          JSON.stringify({ position: position })
        );
      }

      let panelConfig = JSON.parse(
        fs.readFileSync(path.resolve(user.getPath(), `./panel.json`)).toString()
      );

      panelConfig.position = position;

      fs.writeFileSync(
        path.resolve(user.getPath(), `./panel.json`),
        JSON.stringify(panelConfig)
      );
    } catch (err) {
      return this;
    }

    return this;
  }

  getPanelPosition(): YourDashPanelPosition {
    let user = new YourDashUser(this.username);

    try {
      if (!fs.existsSync(path.resolve(user.getPath(), `./panel.json`))) {
        return YourDashPanelPosition.left;
      }

      let panelConfig = JSON.parse(
        fs.readFileSync(path.resolve(user.getPath(), `./panel.json`)).toString()
      );

      return panelConfig.position;
    } catch (err) {
      return YourDashPanelPosition.left;
    }
  }

  getLauncherType(): YourDashPanelLauncherType {
    let user = new YourDashUser(this.username);

    try {
      if (!fs.existsSync(path.resolve(user.getPath(), `./panel.json`))) {
        return YourDashPanelLauncherType.popOut;
      }

      let panelConfig = JSON.parse(
        fs.readFileSync(path.resolve(user.getPath(), `./panel.json`)).toString()
      );

      return panelConfig.launcher;
    } catch (err) {
      return YourDashPanelLauncherType.popOut;
    }
  }

  setLauncherType(launcher: YourDashPanelLauncherType): this {
    let user = new YourDashUser(this.username);

    try {
      if (!fs.existsSync(path.resolve(user.getPath(), `./panel.json`))) {
        fs.writeFileSync(
          path.resolve(user.getPath(), `./panel.json`),
          JSON.stringify({ launcher: 0 })
        );
      }

      let panelConfig = JSON.parse(
        fs.readFileSync(path.resolve(user.getPath(), `./panel.json`)).toString()
      );

      panelConfig.launcher = launcher;

      fs.writeFileSync(
        path.resolve(user.getPath(), `./panel.json`),
        JSON.stringify(panelConfig)
      );
    } catch (err) {
      return this;
    }

    return this;
  }
}
