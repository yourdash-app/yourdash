import { promises as fs } from "fs";
import path from "path";
import YourDashUser from "../core/user/user.js";
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
        const user = await new YourDashUser(this.username).read();
        const db = await user.getPersonalDatabase();
        return JSON.parse(db.get("core:panel:quickShortcuts") || "[]");
    }
    async removeQuickShortcut(index) {
        const user = await new YourDashUser(this.username).read();
        const db = await user.getPersonalDatabase();
        const shortcuts = JSON.parse(db.get("core:panel:quickShortcuts"));
        shortcuts.splice(index, 1);
        db.set("core:panel:quickShortcuts", JSON.stringify(shortcuts));
        return this;
    }
    async createQuickShortcut(applicationID) {
        const user = await new YourDashUser(this.username).read();
        const db = await user.getPersonalDatabase();
        const shortcuts = JSON.parse(db.get("core:panel:quickShortcuts") || "[]");
        if (shortcuts.indexOf(applicationID) !== -1) {
            return this;
        }
        shortcuts.push(applicationID);
        db.set("core:panel:quickShortcuts", JSON.stringify(shortcuts));
        return this;
    }
    async setPanelPosition(position) {
        const user = new YourDashUser(this.username);
        let panelConfig;
        try {
            panelConfig = JSON.parse((await fs.readFile(path.resolve(user.getPath(), "./panel.json"))).toString());
        }
        catch (_err) {
            panelConfig = DEFAULT_PANEL_CONFIG;
        }
        panelConfig.position = position;
        try {
            await fs.writeFile(path.resolve(user.getPath(), "./panel.json"), JSON.stringify(panelConfig));
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
            panelConfig = JSON.parse((await fs.readFile(path.resolve(user.getPath(), "./panel.json"))).toString());
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
            panelConfig = JSON.parse((await fs.readFile(path.resolve(user.getPath(), "./panel.json"))).toString());
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
            panelConfig = JSON.parse((await fs.readFile(path.resolve(user.getPath(), "./panel.json"))).toString());
        }
        catch (_err) {
            panelConfig = DEFAULT_PANEL_CONFIG;
        }
        panelConfig.launcher = launcher;
        try {
            await fs.writeFile(path.resolve(user.getPath(), "./panel.json"), JSON.stringify(panelConfig));
        }
        catch (_err) {
            return this;
        }
        return this;
    }
}
//# sourceMappingURL=panel.js.map