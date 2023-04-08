import fs from "fs";
import YourDashUser from "./user.js";
import path from "path";
import { base64ToDataUrl, dataUrlToBase64 } from "./base64.js";
import sharp from "sharp";

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

export default class YourDashPanel {
  username: string;

  constructor(username: string) {
    this.username = username;
    return this;
  }

  getQuickShortcuts(): YourDashPanelQuickShortcut[] {
    let user = new YourDashUser(this.username);
    return JSON.parse(
      fs
        .readFileSync(path.resolve(user.getPath(), `./quick-shortcuts.json`))
        .toString()
    );
  }

  removeQuickShortcut(index: number): this {
    let user = new YourDashUser(this.username);

    try {
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
      let quickShortcuts: YourDashPanelQuickShortcut[] = JSON.parse(
        fs
          .readFileSync(path.resolve(user.getPath(), `./quick-shortcuts.json`))
          .toString()
      );

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
        return this;
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
}
