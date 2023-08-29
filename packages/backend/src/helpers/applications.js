import { promises as fs } from "fs";
import path from "path";
import log, { logTypes } from "./log.js";
import globalDatabase from "./globalDatabase.js";
class YourDashApplication {
    name;
    application;
    constructor(application) {
        this.name = application.name;
        this.application = application;
        return this;
    }
    getName() {
        return this.application.name;
    }
    getDisplayName() {
        return this.application.displayName;
    }
    getDescription() {
        return this.application.description;
    }
    getDependencies() {
        return this.application.dependencies || [];
    }
    getIcon() {
        try {
            return fs.readFile(path.resolve(process.cwd(), `../applications/${this.name}/icon.avif`));
        }
        catch (_e) {
            return fs.readFile(path.resolve(process.cwd(), "./src/assets/placeholder_application_icon.png"));
        }
    }
    getIconPath() {
        return path.resolve(process.cwd(), `../applications/${this.name}/icon.avif`);
    }
    getStoreBackground() {
        try {
            return fs.readFile(path.resolve(process.cwd(), "./src/assets/promoted_application_default_background.png"));
        }
        catch (_e) {
            return fs.readFile(path.resolve(process.cwd(), "./src/assets/promoted_application_default_background.png"));
        }
    }
    isInstalled() {
        return !!globalDatabase.get("installed_applications").includes(this.name);
    }
    getCategory() {
        return this.application.category;
    }
    getPath() {
        return path.resolve(process.cwd(), `../applications/${this.name}/`);
    }
    getRawApplicationData() {
        return this.application;
    }
}
export async function getAllApplications() {
    try {
        return (await fs.readdir(path.resolve(process.cwd(), "../applications/"))).filter(app => app !== "package.json");
    }
    catch (_err) {
        log(logTypes.error, "A problem occurred reading the ../applications/ directory");
        return [];
    }
}
export default class YourDashUnreadApplication {
    name;
    constructor(name) {
        this.name = name;
        return this;
    }
    async read() {
        try {
            return new YourDashApplication(JSON.parse((await fs.readFile(path.resolve(process.cwd(), `../applications/${this.name}/application.json`))).toString() ||
                "{}"));
        }
        catch (_err) {
            return null;
        }
    }
    async exists() {
        try {
            await fs.readFile(path.resolve(process.cwd(), `../applications/${this.name}/application.json`));
            return true;
        }
        catch (_err) {
            return false;
        }
    }
    getPath() {
        return path.resolve(process.cwd(), `../applications/${this.name}/`);
    }
}
//# sourceMappingURL=applications.js.map