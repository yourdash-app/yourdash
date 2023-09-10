import KeyValueDatabase from "./keyValueDatabase.js";
import path from "path";
import YourDashUnreadUser from "../core/user/user.js";
const USER_DATABASES = {};
export default async function getUserDatabase(username) {
    if (USER_DATABASES[username]) {
        return USER_DATABASES[username];
    }
    USER_DATABASES[username] = new KeyValueDatabase();
    const user = new YourDashUnreadUser(username);
    await USER_DATABASES[username].readFromDisk(path.resolve(user.getPath(), "./user_db.json"));
    return USER_DATABASES[username];
}
//# sourceMappingURL=userDatabase.js.map