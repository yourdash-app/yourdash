import { promises as fs, writeFileSync } from "fs";
import YourDashUser from "../user/index.js";
import path from "path";
export const USER_DATABASES = new Map();
export function saveUserDatabases() {
    const databases = Array.from(USER_DATABASES);
    databases.map(([key, database]) => {
        const user = new YourDashUser(key);
        console.log("Saving database", database);
        writeFileSync(path.join(user.path, "core/user_db.json"), JSON.stringify(database));
    });
}
export async function loadUserDatabase(username) {
    const user = new YourDashUser(username);
    return JSON.parse((await fs.readFile(path.join(user.path, "core/user_db.json"))).toString());
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