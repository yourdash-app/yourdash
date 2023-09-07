import { promises as fs } from "fs";
import YourDashUnreadUser from "../../helpers/user.js";
import path from "path";
export const USER_DATABASES = new Map();
export function saveUserDatabases() {
    USER_DATABASES.forEach(async (database, key) => {
        const user = new YourDashUnreadUser(key);
        await fs.writeFile(path.join(user.getPath(), "user_db.json"), JSON.stringify(database));
    });
}
export async function loadUserDatabase(username) {
    const user = new YourDashUnreadUser(username);
    return JSON.parse((await fs.readFile(path.join(user.getPath(), "user_db.json"))).toString());
}
export default function defineUserDatabaseRoutes(exp) {
    exp.get("/core/user_db", async (req, res) => {
        const { username } = req.headers;
        if (!USER_DATABASES.get(username)) {
            USER_DATABASES.set(username, await loadUserDatabase(username));
        }
        return res.json(USER_DATABASES.get(username) || {});
    });
    exp.post("/core/user_db", async (req, res) => {
        const { username } = req.headers;
        USER_DATABASES.set(username, req.body);
        console.log(USER_DATABASES.get(username));
        return res.json({ success: true });
    });
}
//# sourceMappingURL=userDatabase.js.map