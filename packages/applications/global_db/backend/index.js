import YourDashUser from "backend/src/core/user/index.js";
import { YourDashCoreUserPermissions } from "backend/src/core/user/permissions.js";
import globalDatabase from "backend/src/helpers/globalDatabase.js";
import path from "path";
const main = ({ exp }) => {
    exp.get("/app/global_db/db", async (req, res) => {
        const { username } = req.headers;
        const user = new YourDashUser(username);
        if (await user.hasPermission(YourDashCoreUserPermissions.Administrator)) {
            return res.json({
                db: globalDatabase.keys
            });
        }
        return res.json({
            error: true
        });
    });
    exp.post("/app/global_db/db", async (req, res) => {
        const { username } = req.headers;
        const keys = req.body;
        const user = new YourDashUser(username);
        if (await user.hasPermission(YourDashCoreUserPermissions.Administrator)) {
            globalDatabase.merge(keys);
            return res.json({
                success: true
            });
        }
        return res.json({ error: true });
    });
    exp.post("/app/global_db/db/force-write", async (req, res) => {
        const { username } = req.headers;
        const keys = req.body;
        const user = new YourDashUser(username);
        if (await user.hasPermission(YourDashCoreUserPermissions.Administrator)) {
            globalDatabase.merge(keys);
            await globalDatabase.writeToDisk(path.resolve(process.cwd(), "./fs/globalDatabase.json"));
            return res.json({
                success: true
            });
        }
        return res.json({ error: true });
    });
};
export default main;
//# sourceMappingURL=index.js.map