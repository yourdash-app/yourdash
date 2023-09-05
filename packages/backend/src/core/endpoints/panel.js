import globalDatabase from "backend/src/helpers/globalDatabase.js";
import YourDashApplication from "backend/src/helpers/applications.js";
import { base64ToDataUrl } from "backend/src/helpers/base64.js";
import sharp from "sharp";
import path from "path";
import { promises as fs } from "fs";
import YourDashPanel from "backend/src/helpers/panel.js";
import { FS_DIRECTORY_PATH } from "../../main.js";
import authenticatedImage, { authenticatedImageType } from "../authenticatedImage.js";
export default async function defineRoute(exp) {
    exp.get("/core/panel/applications", async (_req, res) => {
        res.set("Cache-Control", "no-store");
        Promise.all((globalDatabase.get("installedApplications")).map(async (app) => {
            const application = await new YourDashApplication(app).read();
            return new Promise(async (resolve) => {
                sharp(await fs.readFile(path.resolve(process.cwd(), `../applications/${app}/icon.avif`))).resize(88, 88).toBuffer((err, buf) => {
                    if (err) {
                        resolve({ error: true });
                    }
                    resolve({
                        name: application.getName(),
                        displayName: application.getDisplayName(),
                        description: application.getDescription(),
                        icon: base64ToDataUrl(buf.toString("base64"))
                    });
                });
            });
        })).then(resp => res.json(resp));
    });
    exp.get("/core/panel/quick-shortcuts", async (req, res) => {
        res.set("Cache-Control", "no-store");
        const { username } = req.headers;
        const panel = new YourDashPanel(username);
        return res.json(await panel.getQuickShortcuts());
    });
    exp.delete("/core/panel/quick-shortcuts:ind", async (req, res) => {
        res.set("Cache-Control", "no-store");
        const { ind } = req.params;
        const { username } = req.headers;
        const panel = new YourDashPanel(username);
        await panel.removeQuickShortcut(parseInt(ind, 10));
        return res.json({ success: true });
    });
    exp.post("/core/panel/quick-shortcuts/create", async (req, res) => {
        res.set("Cache-Control", "no-store");
        const { username } = req.headers;
        const { displayName, name } = req.body;
        const panel = new YourDashPanel(username);
        const application = new YourDashApplication(name);
        try {
            await panel.createQuickShortcut(displayName, `/app/a/${name}`, await fs.readFile(path.resolve(application.getPath(), "./icon.avif")));
            return res.json({ success: true });
        }
        catch (_err) {
            return res.json({ error: true });
        }
    });
    exp.get("/core/panel/position", async (req, res) => {
        res.set("Cache-Control", "no-store");
        const { username } = req.headers;
        const panel = new YourDashPanel(username);
        return res.json({ position: await panel.getPanelPosition() });
    });
    exp.get("/core/panel/quick-shortcuts", async (req, res) => {
        res.set("Cache-Control", "no-store");
        const { username } = req.headers;
        const panel = new YourDashPanel(username);
        return res.json({ launcher: await panel.getLauncherType() });
    });
    exp.get("/core/panel/logo", (req, res) => {
        const { username } = req.headers;
        return res.json({
            small: authenticatedImage(username, authenticatedImageType.file, path.join(FS_DIRECTORY_PATH, "./logo_panel_small.avif")),
            medium: authenticatedImage(username, authenticatedImageType.file, path.join(FS_DIRECTORY_PATH, "./logo_panel_medium.avif")),
            large: authenticatedImage(username, authenticatedImageType.file, path.join(FS_DIRECTORY_PATH, "./logo_panel_large.avif"))
        });
    });
}
//# sourceMappingURL=panel.js.map