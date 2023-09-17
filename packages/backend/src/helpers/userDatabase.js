import scheduleTask from "../core/taskScheduler.js";
import YourDashUser from "../core/user/index.js";
import KeyValueDatabase from "./keyValueDatabase.js";
import path from "path";
const USER_DATABASES = {};
export function startUserDatabaseService() {
    scheduleTask("core:userdb_write_to_disk", "*/1 * * * *", () => {
        Object.keys(USER_DATABASES).forEach(async (username) => {
            if (USER_DATABASES[username].changed) {
                const user = new YourDashUser(username);
                await USER_DATABASES[username].db.writeToDisk(path.join(user.path, "core/user_db.json"));
            }
        });
    });
}
export default async function getUserDatabase(username) {
    if (USER_DATABASES[username]) {
        return USER_DATABASES[username].db;
    }
    USER_DATABASES[username] = { db: new KeyValueDatabase(), changed: false };
    const user = new YourDashUser(username);
    await USER_DATABASES[username].db.readFromDisk(path.join(user.path, "core/user_db.json"));
    return USER_DATABASES[username].db;
}
export function addUserDatabaseToSaveQueue(username) {
    USER_DATABASES[username].changed = true;
}
export async function saveUserDatabaseInstantly(username) {
    USER_DATABASES[username].changed = false;
    const user = new YourDashUser(username);
    await USER_DATABASES[username].db.writeToDisk(path.join(user.path, "core/user_db.json"));
}
//# sourceMappingURL=userDatabase.js.map