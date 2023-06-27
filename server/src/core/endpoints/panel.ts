import { Application as ExpressApplication } from "express";
import globalDatabase from "../../helpers/globalDatabase.js";
import YourDashUnreadApplication from "../../helpers/applications.js";
import { base64ToDataUrl } from "../../helpers/base64.js";
import sharp from "sharp";
import path from "path";
import { promises as fs, existsSync as fsExistsSync } from "fs";
import YourDashUnreadUser from "../../helpers/user.js";
import YourDashPanel from "../../helpers/panel.js";

export default async function defineRoute(app: ExpressApplication) {
  app.get("/core/panel/applications", async (_req, res) => {
    res.set("Cache-Control", "no-store");

    Promise.all((globalDatabase.get("installed_applications")).map(async app => {
      const application = await new YourDashUnreadApplication(app).read();
      return new Promise(async resolve => {
        sharp(
          await fs.readFile(path.resolve(
            process.cwd(),
            `./src/apps/${ app }/icon.avif`
          ))
        ).resize(98, 98).toBuffer((err, buf) => {
          if (err) {
            resolve({ error: true });
          }

          resolve({
            name: application.getName(),
            displayName: application.getDisplayName(),
            description: application.getDescription(),
            icon: base64ToDataUrl(buf.toString("base64"))
          });
        });
      });
    })).then(resp => res.json(resp));
  });

  app.get("/core/panel/user-full-name", async (req, res) => {
    res.set("Cache-Control", "no-store");

    const { username } = req.headers as {
      username: string
    };
    const user = (await new YourDashUnreadUser(username).read());
    return res.json(user.getName());
  });

  app.get("/core/panel/quick-shortcuts", async (req, res) => {
    res.set("Cache-Control", "no-store");

    const { username } = req.headers as {
      username: string
    };

    const panel = new YourDashPanel(username);

    return res.json(await panel.getQuickShortcuts());
  });

  app.delete("/core/panel/quick-shortcuts:ind", async (req, res) => {
    res.set("Cache-Control", "no-store");

    const { ind } = req.params;
    const { username } = req.headers as {
      username: string
    };

    const panel = new YourDashPanel(username);

    await panel.removeQuickShortcut(parseInt(ind, 10));

    return res.json({ success: true });
  });

  app.post("/core/panel/quick-shortcuts/create", async (req, res) => {
    res.set("Cache-Control", "no-store");

    const { username } = req.headers as {
      username: string
    };
    const {
      displayName,
      name
    } = req.body as {
      displayName: string;
      name: string;
    };

    const panel = new YourDashPanel(username);
    const application = new YourDashUnreadApplication(name);

    try {
      await panel.createQuickShortcut(
        displayName,
        `/app/a/${ name }`,
        await fs.readFile(path.resolve(application.getPath(), "./icon.avif"))
      );
      return res.json({ success: true });
    } catch (_err) {
      return res.json({ error: true });
    }
  });

  app.get("/core/panel/position", async (req, res) => {
    res.set("Cache-Control", "no-store");

    const { username } = req.headers as {
      username: string
    };

    const panel = new YourDashPanel(username);

    return res.json({ position: await panel.getPanelPosition() });
  });

  app.get("/core/panel/quick-shortcuts", async (req, res) => {
    res.set("Cache-Control", "no-store");

    const { username } = req.headers as {
      username: string
    };

    const panel = new YourDashPanel(username);

    return res.json({ launcher: await panel.getLauncherType() });
  });
}
