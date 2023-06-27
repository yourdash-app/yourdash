import { promises as fs, writeFile } from "fs";

import KVD from "../../../shared/core/database.js";

export default class KeyValueDatabase extends KVD {
  constructor() {
    super();
  }

  writeToDisk(path: string, cb: () => void) {
    try {
      writeFile(path, JSON.stringify(this.keys), cb);
    } catch (_err) {
      /* empty */
    }
  }

  async readFromDisk(path: string) {
    try {
      const data = await fs.readFile(path, "utf8");
      this.keys = JSON.parse(data);
      return true;
    } catch (_err) {
      return false;
    }
  }
}
