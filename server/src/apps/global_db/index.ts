import YourDashUnreadUser, { YourDashUserPermissions } from "../../helpers/user.js";
import { type YourDashApplicationServerPlugin } from "../../helpers/applications.js";
import globalDatabase from "../../helpers/globalDatabase.js";

const main: YourDashApplicationServerPlugin = ({ app }) => {
  app.get("/app/global_db/db", async (req, res) => {
    const { username } = req.headers as {
      username: string
    };

    const user = await new YourDashUnreadUser(username).read();

    if (user.hasPermission(YourDashUserPermissions.Administrator)) {
      return res.json({
        db: globalDatabase.keys
      });
    }

    return res.json({
      error: true
    });
  });

  app.post("/app/global_db/db", async (req, res) => {
    const { username } = req.headers as {
      username: string
    };

    const keys = req.body;

    const user = await new YourDashUnreadUser(username).read();

    if (user.hasPermission(YourDashUserPermissions.Administrator)) {
      globalDatabase.merge(keys);

      return res.json({
        success: true
      });
    }

    return res.json({ error: true });
  });
};

export default main;
