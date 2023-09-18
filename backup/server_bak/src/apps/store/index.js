import YourDashUnreadApplication, { getAllApplications } from "../../helpers/applications.js";
import { getInstanceLogoBase64 } from "../../helpers/logo.js";
import getAllCategories, { getAllApplicationsFromCategory } from "./helpers/categories.js";
import globalDatabase from "../../helpers/globalDatabase.js";
import { loadApplication } from "../../core/loadApplications.js";
import path from "path";
import authenticatedImage, { authenticatedImageType } from "../../core/authenticatedImage.js";
const promotedApplications = ["dash", "store"];
const main = ({ app, io }) => {
    app.get("/app/store/promoted/applications", (_req, res) => {
        Promise.all(promotedApplications.map(async (app) => {
            const application = (await new YourDashUnreadApplication(app).read());
            return {
                name: application.getName(),
                backgroundImage: `data:image/png;base64,${(await application.getStoreBackground()).toString("base64")}`,
                icon: `data:image/avif;base64,${(await application.getIcon()).toString("base64")}`,
                displayName: application.getDisplayName(),
                installed: application.isInstalled()
            };
        })).then(out => res.json(out));
    });
    app.get("/app/store/categories", async (_req, res) => {
        const applications = await getAllApplications();
        const categories = {};
        for (const application of applications) {
            const unreadApp = new YourDashUnreadApplication(application);
            if (!(await unreadApp.exists())) {
                continue;
            }
            const app = await unreadApp.read();
            categories[app.getCategory()] = true;
        }
        return res.json(Object.keys(categories));
    });
    app.get("/app/store/applications", async (req, res) => {
        const { username } = req.headers;
        const applications = await getAllApplications();
        return res.json(await Promise.all(applications.map(async (application) => {
            const app = await new YourDashUnreadApplication(application).read();
            return {
                id: application,
                displayName: app.getDisplayName(),
                icon: authenticatedImage(username, authenticatedImageType.file, app.getIconPath())
            };
        })));
    });
    app.get("/app/store/category/:id", async (req, res) => {
        const { id } = req.params;
        if (!id) {
            return res.json({ error: true });
        }
        const categories = await getAllCategories();
        if (!categories.includes(id)) {
            return res.json({ error: `unknown category ${id}` });
        }
        const categoryApplications = await getAllApplicationsFromCategory(id);
        const applicationsOutput = [];
        await Promise.all(categoryApplications.map(async (app) => {
            const application = await new YourDashUnreadApplication(app).read();
            applicationsOutput.push({
                name: application.getName(),
                icon: `data:image/avif;base64,${(await application.getIcon()).toString("base64")}`,
                displayName: application.getDisplayName()
            });
        }));
        return res.json({
            id,
            applications: applicationsOutput,
            icon: `data:image/avif;base64,${getInstanceLogoBase64()}`,
            displayName: id.slice(0, 1).toUpperCase() + id.slice(1),
            promotedApplications,
            bannerImage: `data:image/avif;base64,${getInstanceLogoBase64()}`
        });
    });
    app.get("/app/store/application/:id", async (req, res) => {
        const { id } = req.params;
        if (!id) {
            return res.json({ error: true });
        }
        const unreadApplication = new YourDashUnreadApplication(id);
        if (!(await unreadApplication.exists())) {
            return res.json({ error: true });
        }
        const application = await unreadApplication.read();
        const response = {
            ...application.getRawApplicationData(),
            icon: `data:image/avif;base64,${(await application.getIcon()).toString("base64")}`,
            installed: application.isInstalled()
        };
        return res.json(response);
    });
    app.post("/app/store/application/install/:id", async (req, res) => {
        const { id } = req.params;
        const applicationUnread = new YourDashUnreadApplication(id);
        if (!(await applicationUnread.exists())) {
            return res.json({ error: true });
        }
        const application = await applicationUnread.read();
        globalDatabase.set("installed_applications", [...globalDatabase.get("installed_applications"), id, ...application.getDependencies()]);
        loadApplication(id, app, io);
        return res.json({ success: true });
    });
    app.post("/app/store/application/uninstall/:id", (req, res) => {
        const { id } = req.params;
        const application = new YourDashUnreadApplication(id);
        if (!application.exists()) {
            return res.json({ error: true });
        }
        globalDatabase.set("installed_applications", globalDatabase.get("installed_applications").filter(app => app !== id));
        return res.json({ success: true });
    });
    app.get("/app/store/application/:id/icon", async (req, res) => {
        const { id } = req.params;
        const unreadApplication = new YourDashUnreadApplication(id);
        if (!(await unreadApplication.exists())) {
            return res.sendFile(path.resolve(process.cwd(), "./assets/placeholder_application_icon.png"));
        }
        const application = await unreadApplication.read();
        return res.sendFile(application.getIconPath());
    });
};
export default main;
//# sourceMappingURL=index.js.map