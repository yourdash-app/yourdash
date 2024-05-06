/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import core from "@yourdash/backend/src/core/core.js";
import BackendModule, { YourDashModuleArguments } from "@yourdash/backend/src/core/moduleManager/backendModule.js";
import generateUUID from "@yourdash/shared/web/helpers/uuid.js";
import * as path from "path";
import ChatbotsBotApplication from "../shared/application.js";

export default class ChatbotsModule extends BackendModule {
  loadedBots: {
    id: string;
    ownerTeam: string;
    bot: ChatbotsBotApplication;
  }[];

  constructor(args: YourDashModuleArguments) {
    super(args);

    return this;
  }

  public loadEndpoints() {
    this.api.request.post("/app/chatbots/integration/discord/authorize-user", async (req, res) => {
      const user = this.api.getUser(req);

      try {
        await (
          await core.fs.getOrCreateFile(path.join(user.path, "apps/chatbots/discord/key.json"))
        ).write(
          JSON.stringify({
            botOwnerToken: req.body.token,
          }),
        );
      } catch (e) {
        console.log(e);
        return res.json({ error: true });
      }

      return res.json({ success: true });
    });

    this.api.request.get("/app/chatbots/authorize/check/discord", (_req, res) => {
      return res.json({ authorized: false });
    });

    this.api.request.usePath("/app/chatbots/team/:teamId/*", async (req, res, next) => {
      const { username } = req.headers as { username: string };
      const { teamId } = req.params;

      const team = await core.teams.get(teamId);

      if (!(await team.doesExist())) {
        return res.json({ error: `Invalid team: ${teamId}` });
      }

      if (!team.containsMember(username)) {
        return res.json({ error: `You are not on the team: ${teamId}` });
      }

      return next();
    });

    this.api.request.post("/app/chatbots/team/:teamId/create-bot/", async (req, res) => {
      const { teamId } = req.params;
      const botId = generateUUID();

      const team = await core.teams.get(teamId);
      const teamBotsDirectory = await core.fs.getDirectory(path.join(team.getPath(), "apps/chatbots/bots"));
      const botDirectory = await core.fs.createDirectory(path.join(teamBotsDirectory.path, botId));

      await (
        await core.fs.getFile(path.join(botDirectory.path, "bot.json"))
      ).write(
        JSON.stringify({
          value: botId,
          ownerTeam: teamId,
          token: undefined,
        }),
      );

      return res.json({
        success: true,
      });
    });

    this.api.request.get("/app/chatbots/team/:teamId/list-bots", async (req, res) => {
      const { teamId } = req.params;

      const team = await core.teams.get(teamId);
      if (!(await team.doesExist())) return res.json({ error: `Invalid team: ${teamId}` });

      const teamBotsDirectory = await core.fs.getDirectory(path.join(team.getPath(), "apps/chatbots/bots"));

      return res.json({ bots: await teamBotsDirectory.getChildrenAsBaseName() });
    });

    this.api.request.get("/app/chatbots/team/:teamId/list/:botId", async (req, res) => {
      const { teamId, botId } = req.params;

      const team = await core.teams.get(teamId);
      const teamBotsDirectory = await core.fs.getDirectory(path.join(team.getPath(), "apps/chatbots/bots/", botId));

      if (!(await teamBotsDirectory.doesExist())) {
        return res.json({ error: `Invalid bot: ${botId}` });
      }

      return res.json({
        bots: await (await core.fs.getFile(path.join(teamBotsDirectory.path, "bot.json"))).read("json"),
      });
    });
  }
}
