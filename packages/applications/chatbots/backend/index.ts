/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import coreApi from "@yourdash/backend/src/core/coreApi.js";
import { LOG_TYPE } from "@yourdash/backend/src/core/coreApiLog.js";
import BackendModule, { YourDashModuleArguments } from "@yourdash/backend/src/core/moduleManager/backendModule.js";
import * as path from "path";
import { fetch } from "undici";
import { Request as ExpressRequest } from "express";

export default class DiffusionLabModule extends BackendModule {
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

    this.API.request.post("/app/chatbots/integration/discord/create-bot", async (req, res) => {
      const { username, displayName, bio, avatarUrl } = req.body;

      if (!username) {
        return res.json({ success: false, error: "No username provided" });
      }
      if (!displayName) {
        return res.json({
          success: false,
          error: "No display name provided",
        });
      }
      if (!bio) {
        return res.json({ success: false, error: "No bio provided" });
      }
      if (!avatarUrl) {
        return res.json({ success: false, error: "No avatar url provided" });
      }

      const botOwnerToken = await this.getBotOwnerToken(req);

      if (!botOwnerToken) {
        return res.json({
          success: false,
          error: "No bot owner token provided",
        });
      }

      try {
        const response = await fetch("https://discord.com/api/v9/applications", {
          headers: {
            Origin: "https://discord.com",
            Referer: "https://discord.com/developers/applications",
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
            "Content-Type": "application/json",
            Authorization: botOwnerToken,
          },
          method: "POST",
          body: JSON.stringify({
            name: username,
            team_id: null,
          }),
        });

        this.API.log(LOG_TYPE.INFO, response.json());
      } catch (_err) {
        console.log(_err);
        return res.json({ success: false, error: _err });
      }
    });
  }

  async getBotOwnerToken(req: ExpressRequest): Promise<string> {
    const user = this.API.getUser(req);

    return (await (await coreApi.fs.getFile(path.join(user.path, "fs/apps/chatbots/discord/key.json"))).read("json"))
      .botOwnerToken;
  }
}
