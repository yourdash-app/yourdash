import fs from "fs";
import path from "path";
import sharp from "sharp";
import log, { logTypes } from "./log.js";
export function generateLogos() {
    sharp(fs.readFileSync(path.resolve(process.cwd(), "./fs/instance_logo.avif")))
        .resize(36, 36)
        .toFile(path.resolve(process.cwd(), "./fs/logo_panel_small.avif")).catch(err => {
        log(logTypes.error, `unable to create "fs/logo_panel_small.avif" ${err}`);
    });
}
export function getInstanceLogoBase64() {
    return fs.readFileSync(path.resolve(process.cwd(), "./fs/instance_logo.avif")).toString("base64");
}
//# sourceMappingURL=logo.js.map