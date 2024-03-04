/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import coreApi from "@yourdash/backend/src/core/coreApi.js";
import BackendModule, { YourDashModuleArguments } from "@yourdash/backend/src/core/moduleManager/backendModule.js";
import generateUUID from "@yourdash/shared/web/helpers/uuid.js";
import * as path from "path";
import { Request as ExpressRequest } from "express";
import ChatbotsBot from "./bot.js";

export default class ChatbotsModule extends BackendModule {
  loadedBots: {
    id: string;
    ownerTeam: string;
    bot: ChatbotsBot;
  }[];

  constructor(args: YourDashModuleArguments) {
    super(args);

    this.API.request.post("/app/chatbots/integration/discord/authorize-user", async (req, res) => {
      const user = this.API.getUser(req);

      try {
        await (
          await coreApi.fs.getOrCreateFile(path.join(user.path, "apps/chatbots/discord/key.json"))
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

    this.API.request.get("/app/chatbots/authorize/check/discord", (_req, res) => {
      return res.json({ authorized: false });
    });

    this.API.request.use("/app/chatbots/team/:teamId/*", async (req, res, next) => {
      const { username } = req.headers as { username: string };
      const { teamId } = req.params;

      const team = await coreApi.teams.get(teamId);

      if (!(await team.doesExist())) {
        return res.json({ error: `Invalid team: ${teamId}` });
      }

      if (!team.containsMember(username)) {
        return res.json({ error: `You are not on the team: ${teamId}` });
      }

      return next();
    });

    this.API.request.post("/app/chatbots/team/:teamId/create-bot/", async (req, res) => {
      const { teamId } = req.params;
      const botId = generateUUID();

      const team = await coreApi.teams.get(teamId);
      const teamBotsDirectory = await coreApi.fs.getDirectory(path.join(team.getPath(), "apps/chatbots/bots"));
      const botDirectory = await coreApi.fs.createDirectory(path.join(teamBotsDirectory.path, botId));

      await (
        await coreApi.fs.getFile(path.join(botDirectory.path, "bot.json"))
      ).write(
        JSON.stringify({
          id: botId,
          ownerTeam: teamId,
          token: undefined,
        }),
      );
    });

    this.API.request.get("/app/chatbots/team/:teamId/list-bots", async (req, res) => {
      const { teamId } = req.params;

      const team = await coreApi.teams.get(teamId);
      if (!(await team.doesExist())) return res.json({ error: `Invalid team: ${teamId}` });

      const teamBotsDirectory = await coreApi.fs.getDirectory(path.join(team.getPath(), "apps/chatbots/bots"));

      return res.json({ bots: await teamBotsDirectory.getChildren() });
    });

    this.API.request.get("/app/chatbots/team/:teamId/list/:botId", async (req, res) => {
      const { teamId, botId } = req.params;

      const team = await coreApi.teams.get(teamId);
      const teamBotsDirectory = await coreApi.fs.getDirectory(path.join(team.getPath(), "apps/chatbots/bots/", botId));

      if (!(await teamBotsDirectory.doesExist())) {
        return res.json({ error: `Invalid bot: ${botId}` });
      }

      return res.json({
        bots: await (await coreApi.fs.getFile(path.join(teamBotsDirectory.path, "bot.json"))).read("json"),
      });
    });
  }

  async getBotOwnerToken(req: ExpressRequest): Promise<string> {
    const user = this.API.getUser(req);

    return (await (await coreApi.fs.getFile(path.join(user.path, "fs/apps/chatbots/discord/key.json"))).read("json"))
      .botOwnerToken;
  }
}
