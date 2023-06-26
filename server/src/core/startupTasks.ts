import globalDatabase from "../helpers/globalDatabase.js";
import { promises as fs, existsSync as fsExistsSync } from "fs";
import log, { logTypes } from "../helpers/log.js";
import path from "path";

export default async function startupTasks() {
  if (fsExistsSync(path.resolve(process.cwd(), "./fs/globalDatabase.json"))) {
    await globalDatabase.readFromDisk(path.resolve(process.cwd(), "./fs/globalDatabase.json"));
    log(logTypes.success, "Global database loaded");
  } else {
    globalDatabase.set("installed_applications", ["dash", "settings", "files", "store", "weather"]);
    if (!globalDatabase.writeToDisk(path.resolve(process.cwd(), "./fs/globalDatabase.json"))) {
      log(logTypes.error, "Error creating global database");
    } else {
      log(logTypes.success, "Global database created");
    }
  }
}
