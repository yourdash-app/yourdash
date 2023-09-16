import scheduleTask from "../core/taskScheduler.js";
import KeyValueDatabase from "./keyValueDatabase.js";
import path from "path";
import YourDashUnreadUser from "../core/user/user.js";
const USER_DATABASES = {};
export function startUserDatabaseService() {
    scheduleTask("core:userdb_write_to_disk", "*/1 * * * *", () => {
        Object.keys(USER_DATABASES).forEach(username => {
            if (USER_DATABASES[username].changed) {
                const user = new YourDashUnreadUser(username);
                USER_DATABASES[username].db.writeToDisk(path.resolve(user.getPath(), "./user_db.json"));
            }
        });
    });
}
export default async function getUserDatabase(username) {
    if (USER_DATABASES[username]) {
        return USER_DATABASES[username].db;
    }
    USER_DATABASES[username] = { db: new KeyValueDatabase(), changed: false };
    const user = new YourDashUnreadUser(username);
    await USER_DATABASES[username].db.readFromDisk(path.resolve(user.getPath(), "./user_db.json"));
    return USER_DATABASES[username].db;
}
export function addUserDatabaseToSaveQueue(username) {
    USER_DATABASES[username].changed = true;
}
//# sourceMappingURL=userDatabase.js.map