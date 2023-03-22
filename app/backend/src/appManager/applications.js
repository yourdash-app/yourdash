import * as fs from "fs";
import path from "path";
import Fs from "../fileSystem/fileSystem.js";
export function getInstallableApplications() {
    return fs.readdirSync(path.resolve(`./src/appManager/`, `apps`));
}
export function getInstalledApplications() {
    return fs.readdirSync(path.resolve(`./src/appManager/`, `apps`));
}
export function loadApplication(name) {
    if (getInstallableApplications().indexOf(name) === -1)
        return;
    require(path.resolve(__dirname, `apps`, name, `index.js`));
}
export function getApplicationMetadata(applicationName) {
    return JSON.parse(Fs.openFolder(`./src/appManager/`, `apps/`, applicationName).openFile(`application.json`).read());
}
