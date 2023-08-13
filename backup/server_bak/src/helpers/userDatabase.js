import KeyValueDatabase from "./keyValueDatabase.js";
import path from "path";
import YourDashUnreadUser from "./user.js";
const userDatabases = {};
export default async function getUserDatabase(username) {
    if (userDatabases[username]) {
        return userDatabases[username];
    }
    userDatabases[username] = new KeyValueDatabase();
    const user = new YourDashUnreadUser(username);
    await userDatabases[username].readFromDisk(path.resolve(user.getPath(), "./user_db.json"));
    return userDatabases[username];
}
//# sourceMappingURL=userDatabase.js.map