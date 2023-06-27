import YourDashUnreadUser, { YourDashUserPermissions } from "../../helpers/user.js";
import { type YourDashApplicationServerPlugin } from "../../helpers/applications.js";
import globalDatabase from "../../helpers/globalDatabase.js";

const main: YourDashApplicationServerPlugin = ({ app }) => {
  app.get("/app/global_db/get", async (req, res) => {
    const { username } = req.headers as {
      username: string
    };

    const user = await new YourDashUnreadUser(username).read();

    if (user.hasPermission(YourDashUserPermissions.Administrator)) {
      res.json({
        db: globalDatabase.keys
      });
    }
  });
};

export default main;
