import { promises as fs, writeFile } from "fs";
import KVD from "shared/core/database.js";
export default class KeyValueDatabase extends KVD {
    constructor() {
        super();
    }
    _internalDoNotUseWriteToDiskOnlyIntendedForShutdownSequence(path, cb) {
        try {
            writeFile(path, JSON.stringify(this.keys), cb);
        }
        catch (_err) {
        }
    }
    async writeToDisk(path) {
        try {
            await fs.writeFile(path, JSON.stringify(this.keys));
            return true;
        }
        catch (_err) {
            return false;
        }
    }
    async readFromDisk(path) {
        try {
            const data = await fs.readFile(path, "utf8");
            this.keys = JSON.parse(data);
            return true;
        }
        catch (_err) {
            return false;
        }
    }
}
//# sourceMappingURL=keyValueDatabase.js.map