import { promises as fs } from 'fs';
import path from 'path';
import { base64ToDataUrl } from './base64.js';
import YourDashUser from './user.js';
export var YourDashPanelPosition;
(function (YourDashPanelPosition) {
    YourDashPanelPosition[YourDashPanelPosition["left"] = 0] = "left";
    YourDashPanelPosition[YourDashPanelPosition["top"] = 1] = "top";
    YourDashPanelPosition[YourDashPanelPosition["right"] = 2] = "right";
    YourDashPanelPosition[YourDashPanelPosition["bottom"] = 3] = "bottom";
})(YourDashPanelPosition || (YourDashPanelPosition = {}));
export var YourDashPanelLauncherType;
(function (YourDashPanelLauncherType) {
    YourDashPanelLauncherType[YourDashPanelLauncherType["popOut"] = 0] = "popOut";
    YourDashPanelLauncherType[YourDashPanelLauncherType["slideOut"] = 1] = "slideOut";
})(YourDashPanelLauncherType || (YourDashPanelLauncherType = {}));
const DEFAULT_PANEL_CONFIG = {
    launcher: YourDashPanelLauncherType.popOut,
    position: YourDashPanelPosition.left
};
export default class YourDashPanel {
    username;
    constructor(username) {
        this.username = username;
        return this;
    }
    async getQuickShortcuts() {
        const user = new YourDashUser(this.username);
        try {
            await new Promise(resolve => {
                fs.access(path.resolve(user.getPath(), './quick-shortcuts.json')).then(() => {
                    resolve();
                }).catch(async () => {
                    await fs.writeFile(path.resolve(user.getPath(), './quick-shortcuts.json'), '[]');
                    resolve();
                });
                resolve();
            });
            return JSON.parse((await fs.readFile(path.resolve(user.getPath(), './quick-shortcuts.json'))).toString());
        }
        catch (_err) {
            return [];
        }
    }
    async removeQuickShortcut(index) {
        const user = new YourDashUser(this.username);
        try {
            await new Promise(resolve => {
                fs.access(path.resolve(user.getPath(), './quick-shortcuts.json')).then(() => {
                    resolve();
                }).catch(async () => {
                    await fs.writeFile(path.resolve(user.getPath(), './quick-shortcuts.json'), '[]');
                    resolve();
                });
            });
            let quickShortcuts = JSON.parse((await fs.readFile(path.resolve(user.getPath(), './quick-shortcuts.json'))).toString());
            quickShortcuts = quickShortcuts.filter((_sc, ind) => ind !== index);
            await fs.writeFile(path.resolve(user.getPath(), './quick-shortcuts.json'), JSON.stringify(quickShortcuts));
        }
        catch (_err) {
            return;
        }
    }
    async createQuickShortcut(displayName, url, icon) {
        const user = new YourDashUser(this.username);
        try {
            await new Promise(resolve => {
                fs.access(path.resolve(user.getPath(), './quick-shortcuts.json')).then(() => {
                    resolve();
                }).catch(async () => {
                    await fs.writeFile(path.resolve(user.getPath(), './quick-shortcuts.json'), '[]');
                    resolve();
                });
            });
            const quickShortcuts = JSON.parse((await fs.readFile(path.resolve(user.getPath(), './quick-shortcuts.json'))).toString());
            if (quickShortcuts.filter(shortcut => shortcut.url === url).length !== 0) {
                return this;
            }
            quickShortcuts.push({
                url, displayName, icon: base64ToDataUrl(icon.toString('base64'))
            });
            await fs.writeFile(path.resolve(user.getPath(), './quick-shortcuts.json'), JSON.stringify(quickShortcuts));
        }
        catch (_err) {
            return this;
        }
        return this;
    }
    async setPanelPosition(position) {
        const user = new YourDashUser(this.username);
        let panelConfig;
        try {
            panelConfig = JSON.parse((await fs.readFile(path.resolve(user.getPath(), './panel.json'))).toString());
        }
        catch (_err) {
            panelConfig = DEFAULT_PANEL_CONFIG;
        }
        panelConfig.position = position;
        try {
            await fs.writeFile(path.resolve(user.getPath(), './panel.json'), JSON.stringify(panelConfig));
        }
        catch (_err) {
            return this;
        }
        return this;
    }
    async getPanelPosition() {
        const user = new YourDashUser(this.username);
        let panelConfig;
        try {
            panelConfig = JSON.parse((await fs.readFile(path.resolve(user.getPath(), './panel.json'))).toString());
        }
        catch (_err) {
            panelConfig = DEFAULT_PANEL_CONFIG;
        }
        return panelConfig.position;
    }
    async getLauncherType() {
        const user = new YourDashUser(this.username);
        let panelConfig;
        try {
            panelConfig = JSON.parse((await fs.readFile(path.resolve(user.getPath(), './panel.json'))).toString());
        }
        catch (_err) {
            panelConfig = DEFAULT_PANEL_CONFIG;
        }
        return panelConfig.launcher;
    }
    async setLauncherType(launcher) {
        const user = new YourDashUser(this.username);
        let panelConfig;
        try {
            panelConfig = JSON.parse((await fs.readFile(path.resolve(user.getPath(), './panel.json'))).toString());
        }
        catch (_err) {
            panelConfig = DEFAULT_PANEL_CONFIG;
        }
        panelConfig.launcher = launcher;
        try {
            await fs.writeFile(path.resolve(user.getPath(), './panel.json'), JSON.stringify(panelConfig));
        }
        catch (_err) {
            return this;
        }
        return this;
    }
}
//# sourceMappingURL=panel.js.map