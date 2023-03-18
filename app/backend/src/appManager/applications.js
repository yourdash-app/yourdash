import * as fs from "fs";
import path from "path";
export function getInstallableApplications() {
    return fs.readdirSync(path.resolve(__dirname, `apps`));
}
