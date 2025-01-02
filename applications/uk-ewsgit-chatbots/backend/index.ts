/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import core from "@yourdash/backend/src/core/core.js";
import generateUUID from "@yourdash/shared/web/helpers/uuid.js";
import * as path from "path";
import ChatbotsBotApplication from "../shared/application.js";
import { YourDashBackendModule, YourDashModuleArguments } from "@yourdash/backend/src/core/coreApplicationManager.js";
import FSError from "@yourdash/backend/src/core/fileSystem/FSError.js";

export default class ChatbotsModule extends YourDashBackendModule {
  loadedBots: {
    id: string;
    ownerTeam: string;
    bot: ChatbotsBotApplication;
  }[];

  constructor(args: YourDashModuleArguments) {
    super(args);

    this.loadedBots = [];

    return this;
  }

  public loadEndpoints() {
    core.request.post("/app/chatbots/integration/discord/authorize-user", async (req, res) => {
      const user = core.users.get(req.username);

      try {
        await (
          await core.fs.getFile(path.join(user.path, "apps/chatbots/discord/key.json"))
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

    core.request.get("/app/chatbots/authorize/check/discord", (_req, res) => {
      return res.json({ authorized: false });
    });

    core.request.usePath("/app/chatbots/team/:teamId/*", async (req, res, next) => {
      const { username } = req.headers;
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

    core.request.post("/app/chatbots/team/:teamId/create-bot/", async (req, res) => {
      const { teamId } = req.params;
      const botId = generateUUID();

      const team = await core.teams.get(teamId);
      const teamBotsDirectory = await core.fs.getDirectory(path.join(team.getPath(), "apps/chatbots/bots"));
      const botDirectory = await core.fs.createDirectory(path.join(teamBotsDirectory.path, botId));

      const botJson = await core.fs.getFile(path.join(botDirectory.path, "bot.json"));

      if (botJson instanceof FSError) {
        return res.json({ error: true });
      }

      await botJson.write(
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

    core.request.get("/app/chatbots/team/:teamId/list-bots", async (req, res) => {
      const { teamId } = req.params;

      const team = await core.teams.get(teamId);
      if (!(await team.doesExist())) return res.json({ error: `Invalid team: ${teamId}` });

      const teamBotsDirectory = await core.fs.getDirectory(path.join(team.getPath(), "apps/chatbots/bots"));

      if (teamBotsDirectory instanceof FSError) {
        return res.json({ bots: [] });
      }

      return res.json({ bots: await teamBotsDirectory.getChildrenAsBaseName() });
    });

    core.request.get("/app/chatbots/team/:teamId/list/:botId", async (req, res) => {
      const { teamId, botId } = req.params;

      const team = await core.teams.get(teamId);
      const teamBotsDirectory = await core.fs.getDirectory(path.join(team.getPath(), "apps/chatbots/bots/", botId));

      if (teamBotsDirectory instanceof FSError) {
        return res.json({ error: true });
      }

      if (!(await teamBotsDirectory.doesExist())) {
        return res.json({ error: `Invalid bot: ${botId}` });
      }

      return res.json({
        bots: await (await core.fs.getFile(path.join(teamBotsDirectory.path, "bot.json"))).read("json"),
      });
    });
  }
}
