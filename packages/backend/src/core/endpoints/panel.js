import globalDatabase from "backend/src/helpers/globalDatabase.js";
import YourDashApplication from "backend/src/helpers/applications.js";
import sharp from "sharp";
import path from "path";
import { promises as fs } from "fs";
import YourDashPanel from "backend/src/core/panel.js";
import { FS_DIRECTORY_PATH } from "../../main.js";
import authenticatedImage, { authenticatedImageType } from "../authenticatedImage.js";
export default function defineCorePanelRoutes(exp) {
    exp.get("/core/panel/applications", async (req, res) => {
        res.set("Cache-Control", "no-store");
        const { username } = req.headers;
        Promise.all((globalDatabase.get("installedApplications")).map(async (app) => {
            const application = await new YourDashApplication(app).read();
            return new Promise(async (resolve) => {
                sharp(await fs.readFile(await application.getIconPath()))
                    .resize(88, 88)
                    .toBuffer((err, buf) => {
                    if (err) {
                        resolve({ error: true });
                    }
                    resolve({
                        name: application.getName(),
                        displayName: application.getDisplayName(),
                        description: application.getDescription(),
                        icon: authenticatedImage(username, authenticatedImageType.BASE64, buf.toString("base64"))
                    });
                });
            });
        })).then(resp => res.json(resp));
    });
    exp.get("/core/panel/quick-shortcuts", async (req, res) => {
        res.set("Cache-Control", "no-store");
        const { username } = req.headers;
        const panel = new YourDashPanel(username);
        return res.json(await Promise.all((await panel.getQuickShortcuts()).map(async (shortcut) => {
            const application = await new YourDashApplication(shortcut).read();
            return {
                name: shortcut,
                icon: authenticatedImage(username, authenticatedImageType.FILE, await application.getIconPath())
            };
        })));
    });
    exp.delete("/core/panel/quick-shortcuts/:ind", async (req, res) => {
        res.set("Cache-Control", "");
        const { ind } = req.params;
        const { username } = req.headers;
        const panel = new YourDashPanel(username);
        try {
            await panel.removeQuickShortcut(parseInt(ind, 10));
        }
        catch (e) {
            return res.json({ success: false, error: "Unable to remove shortcut" });
        }
        return res.json({ success: true });
    });
    exp.post("/core/panel/quick-shortcuts/create", async (req, res) => {
        res.set("Cache-Control", "no-store");
        const { username } = req.headers;
        const { name } = req.body;
        const panel = new YourDashPanel(username);
        await panel.createQuickShortcut(name);
        return res.json({ success: true });
    });
    exp.get("/core/panel/position", async (req, res) => {
        res.set("Cache-Control", "no-store");
        const { username } = req.headers;
        const panel = new YourDashPanel(username);
        return res.json({ position: await panel.getPanelPosition() });
    });
    exp.get("/core/panel/launcher-type", async (req, res) => {
        res.set("Cache-Control", "no-store");
        const { username } = req.headers;
        const panel = new YourDashPanel(username);
        return res.json({ launcher: await panel.getLauncherType() });
    });
    exp.get("/core/panel/logo", (req, res) => {
        const { username } = req.headers;
        return res.json({
            small: authenticatedImage(username, authenticatedImageType.FILE, path.join(FS_DIRECTORY_PATH, "./logo_panel_small.avif")),
            medium: authenticatedImage(username, authenticatedImageType.FILE, path.join(FS_DIRECTORY_PATH, "./logo_panel_medium.avif")),
            large: authenticatedImage(username, authenticatedImageType.FILE, path.join(FS_DIRECTORY_PATH, "./logo_panel_large.avif"))
        });
    });
}
//# sourceMappingURL=panel.js.map