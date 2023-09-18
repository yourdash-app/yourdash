import {promises as fs} from 'fs';
import path from 'path';

import {base64ToDataUrl} from './base64.js';
import log from './log.js';
import YourDashUser from './user.js';

export interface YourDashPanelQuickShortcut {
  displayName: string;
  url: string;
  icon: string;
}

export enum YourDashPanelPosition {
  left,
  top,
  right,
  bottom
}

export enum YourDashPanelLauncherType {
  popOut,
  slideOut
}

const DEFAULT_PANEL_CONFIG = {
  launcher: YourDashPanelLauncherType.popOut,
  position: YourDashPanelPosition.left
};

export default class YourDashPanel {
  username: string;

  constructor(username: string) {
    this.username = username;
    return this;
  }

  async getQuickShortcuts(): Promise<YourDashPanelQuickShortcut[]> {
    const user = new YourDashUser(this.username);

    try {
      await new Promise<void>(resolve => {
        fs.access(path.resolve(user.getPath(), './quick-shortcuts.json')).then(() => {
          resolve();
        }).catch(async () => {
          await fs.writeFile(path.resolve(user.getPath(), './quick-shortcuts.json'), '[]');
          resolve();
        });
        resolve();
      });

      return JSON.parse((await fs.readFile(path.resolve(user.getPath(), './quick-shortcuts.json'))).toString());
    } catch (_err) {
      return [];
    }
  }

  async removeQuickShortcut(index: number): Promise<undefined> {
    const user = new YourDashUser(this.username);

    try {
      await new Promise<void>(resolve => {

        fs.access(path.resolve(user.getPath(), './quick-shortcuts.json')).then(() => {
          resolve();
        }).catch(async () => {
          await fs.writeFile(path.resolve(user.getPath(), './quick-shortcuts.json'), '[]');
          resolve();
        });
      });

      let quickShortcuts: YourDashPanelQuickShortcut[] = JSON.parse((await fs.readFile(path.resolve(
        user.getPath(),
        './quick-shortcuts.json'
      ))).toString());

      quickShortcuts = quickShortcuts.filter((_sc, ind) => ind !== index);

      await fs.writeFile(path.resolve(user.getPath(), './quick-shortcuts.json'), JSON.stringify(quickShortcuts));
    } catch (_err) {
      return;
    }
  }

  async createQuickShortcut(displayName: string, url: string, icon: Buffer): Promise<this> {
    const user = new YourDashUser(this.username);

    try {
      await new Promise<void>(resolve => {
        fs.access(path.resolve(user.getPath(), './quick-shortcuts.json')).then(() => {
          resolve();
        }).catch(async () => {
          await fs.writeFile(path.resolve(user.getPath(), './quick-shortcuts.json'), '[]');
          resolve();
        });
      });

      const quickShortcuts: YourDashPanelQuickShortcut[] = JSON.parse(
        (await fs.readFile(path.resolve(user.getPath(), './quick-shortcuts.json'))).toString()
      );

      if (quickShortcuts.filter(shortcut => shortcut.url === url).length !== 0) {
        return this;
      }

      quickShortcuts.push({
        url, displayName, icon: base64ToDataUrl(icon.toString('base64'))
      });

      await fs.writeFile(path.resolve(user.getPath(), './quick-shortcuts.json'), JSON.stringify(quickShortcuts));
    } catch (_err) {
      return this;
    }

    return this;
  }

  async setPanelPosition(position: YourDashPanelPosition): Promise<this> {
    const user = new YourDashUser(this.username);

    let panelConfig;

    try {
      panelConfig = JSON.parse(
        (await fs.readFile(path.resolve(user.getPath(), './panel.json'))).toString()
      );
    } catch (_err) {
      panelConfig = DEFAULT_PANEL_CONFIG;
    }

    panelConfig.position = position;

    try {
      await fs.writeFile(path.resolve(user.getPath(), './panel.json'), JSON.stringify(panelConfig));
    } catch (_err) {
      return this;
    }

    return this;
  }

  async getPanelPosition(): Promise<YourDashPanelPosition> {
    const user = new YourDashUser(this.username);

    let panelConfig;

    try {
      panelConfig = JSON.parse(
        (await fs.readFile(path.resolve(user.getPath(), './panel.json'))).toString()
      );
    } catch (_err) {
      panelConfig = DEFAULT_PANEL_CONFIG;
    }

    return panelConfig.position;
  }

  async getLauncherType(): Promise<YourDashPanelLauncherType> {
    const user = new YourDashUser(this.username);

    let panelConfig;

    try {
      panelConfig = JSON.parse(
        (await fs.readFile(path.resolve(user.getPath(), './panel.json'))).toString()
      );
    } catch (_err) {
      panelConfig = DEFAULT_PANEL_CONFIG;
    }

    return panelConfig.launcher;
  }

  async setLauncherType(launcher: YourDashPanelLauncherType): Promise<this> {
    const user = new YourDashUser(this.username);

    let panelConfig;

    try {
      panelConfig = JSON.parse(
        (await fs.readFile(path.resolve(user.getPath(), './panel.json'))).toString()
      );
    } catch (_err) {
      panelConfig = DEFAULT_PANEL_CONFIG;
    }

    panelConfig.launcher = launcher;

    try {
      await fs.writeFile(path.resolve(user.getPath(), './panel.json'), JSON.stringify(panelConfig));
    } catch (_err) {
      return this;
    }

    return this;
  }
}
