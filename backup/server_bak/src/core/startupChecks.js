import { generateLogos } from "../helpers/logo.js";
import YourDashUnreadUser, { YourDashUserPermissions } from "../helpers/user.js";
import { promises as fs, existsSync as fsExistsSync } from "fs";
import path from "path";
export default async function startupChecks() {
    if (!fsExistsSync(path.resolve(process.cwd(), "./fs/"))) {
        await fs.mkdir(path.resolve(process.cwd(), "./fs/"));
        await fs.cp(path.resolve(process.cwd(), "./src/assets/default_avatar.avif"), path.resolve(process.cwd(), "./fs/default_avatar.avif"));
        await fs.cp(path.resolve(process.cwd(), "./src/assets/default_instance_logo.avif"), path.resolve(process.cwd(), "./fs/instance_logo.avif"));
        await fs.cp(path.resolve(process.cwd(), "./src/assets/default_login_background.avif"), path.resolve(process.cwd(), "./fs/login_background.avif"));
        await fs.mkdir(path.resolve(process.cwd(), "./fs/users/"));
        generateLogos();
    }
    for (const user of (await fs.readdir(path.resolve("./fs/users/")))) {
        await (await new YourDashUnreadUser(user).read()).verifyUserConfig().write();
    }
    const adminUserUnread = new YourDashUnreadUser("admin");
    if (!(await adminUserUnread.exists())) {
        await adminUserUnread.create("password", {
            first: "Admin",
            last: "istrator"
        }, [YourDashUserPermissions.Administrator]);
    }
}
//# sourceMappingURL=startupChecks.js.map