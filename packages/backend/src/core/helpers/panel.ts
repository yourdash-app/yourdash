/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { promises as fs } from "fs";
import path from "path";
import YourDashUser from "../user/index.js";

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

const DEFAULT_PANEL_CONFIG = {
  launcher: YourDashPanelLauncherType.popOut,
  position: YourDashPanelPosition.left,
};

export default class YourDashPanel {
  username: string;

  constructor(username: string) {
    this.username = username;
    return this;
  }

  async getQuickShortcuts(): Promise<{ moduleType: "frontend" | "officialFrontend"; id: string }[]> {
    const user = new YourDashUser(this.username);

    const db = await user.getDatabase();

    return db.get<{ moduleType: "frontend" | "officialFrontend"; id: string }[]>("core:panel:pinned") || [];
  }

  async removeQuickShortcut(index: number): Promise<this> {
    const user = new YourDashUser(this.username);

    const db = await user.getDatabase();

    const shortcuts = db.get<{ moduleType: "frontend" | "officialFrontend"; id: string }[]>("core:panel:pinned") || [];

    shortcuts.splice(index, 1);

    db.set("core:panel:pinned", shortcuts);
    user.saveDatabase();

    return this;
  }

  async createQuickShortcut(module: { moduleType: "frontend" | "officialFrontend"; id: string }): Promise<this> {
    const user = new YourDashUser(this.username);

    const db = await user.getDatabase();

    const shortcuts = db.get<{ moduleType: "frontend" | "officialFrontend"; id: string }[]>("core:panel:pinned") || [];

    if (shortcuts.indexOf(module) !== -1) {
      return this;
    }

    shortcuts.push(module);

    db.set("core:panel:pinned", shortcuts);
    user.saveDatabase();

    return this;
  }

  async setPanelPosition(position: YourDashPanelPosition): Promise<this> {
    const user = new YourDashUser(this.username);

    let panelConfig: {
      position: YourDashPanelPosition;
    };

    try {
      panelConfig = JSON.parse((await fs.readFile(path.join(user.path, "core/panel.json"))).toString());
    } catch (_err) {
      panelConfig = DEFAULT_PANEL_CONFIG;
    }

    panelConfig.position = position;

    try {
      await fs.writeFile(path.join(user.path, "core/panel.json"), JSON.stringify(panelConfig));
    } catch (_err) {
      return this;
    }

    return this;
  }

  async getPanelPosition(): Promise<YourDashPanelPosition> {
    const user = new YourDashUser(this.username);

    let panelConfig: { position: YourDashPanelPosition; launcher?: YourDashPanelLauncherType };

    try {
      panelConfig = JSON.parse((await fs.readFile(path.join(user.path, "core/panel.json"))).toString());
    } catch (_err) {
      panelConfig = DEFAULT_PANEL_CONFIG;
    }

    return panelConfig.position;
  }

  async getLauncherType(): Promise<YourDashPanelLauncherType> {
    const user = new YourDashUser(this.username);

    let panelConfig;

    try {
      panelConfig = JSON.parse((await fs.readFile(path.join(user.path, "core/panel.json"))).toString());
    } catch (_err) {
      panelConfig = DEFAULT_PANEL_CONFIG;
    }

    return panelConfig.launcher;
  }

  async setLauncherType(launcher: YourDashPanelLauncherType): Promise<this> {
    const user = new YourDashUser(this.username);

    let panelConfig;

    try {
      panelConfig = JSON.parse((await fs.readFile(path.join(user.path, "core/panel.json"))).toString());
    } catch (_err) {
      panelConfig = DEFAULT_PANEL_CONFIG;
    }

    panelConfig.launcher = launcher;

    try {
      await fs.writeFile(path.join(user.path, "core/panel.json"), JSON.stringify(panelConfig));
    } catch (_err) {
      return this;
    }

    return this;
  }
}
