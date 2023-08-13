import { generateLogos } from "../helpers/logo.js";
import YourDashUnreadUser, { YourDashUserPermissions } from "../helpers/user.js";
import { promises as fs, existsSync as fsExistsSync } from "fs";
import path from "path";

export default async function startupChecks() {
  // check if the filesystem exists
  if (!fsExistsSync(path.resolve(process.cwd(), "./fs/"))) {
    await fs.mkdir(path.resolve(process.cwd(), "./fs/"));
    // set the instance's default user avatar
    await fs.cp(
      path.resolve(process.cwd(), "./src/assets/default_avatar.avif"),
      path.resolve(process.cwd(), "./fs/default_avatar.avif"
      )
    );
    // set the instance's default logo
    await fs.cp(
      path.resolve(process.cwd(), "./src/assets/default_instance_logo.avif"),
      path.resolve(process.cwd(), "./fs/instance_logo.avif"
      )
    );
    // set the instance's default login background
    await fs.cp(
      path.resolve(process.cwd(), "./src/assets/default_login_background.avif"),
      path.resolve(process.cwd(), "./fs/login_background.avif"
      )
    );
    // create the folder to store all the instance's users
    await fs.mkdir(
      path.resolve(
        process.cwd(),
        "./fs/users/"
      )
    );

    // generate all instance logos
    generateLogos();
  }

  for (const user of (await fs.readdir(path.resolve("./fs/users/")))) {
    await (await new YourDashUnreadUser(user).read()).verifyUserConfig().write();
  }

  const adminUserUnread = new YourDashUnreadUser("admin");

  if (!(await adminUserUnread.exists())) {
    await adminUserUnread.create(
      "password",
      {
        first: "Admin",
        last: "istrator"
      },
      [YourDashUserPermissions.Administrator]
    );
  }
}
