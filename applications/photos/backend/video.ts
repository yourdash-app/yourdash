/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import pth from "path";
import coreApi from "@yourdash/backend/src/core/coreApi.js";
import { AUTHENTICATED_VIDEO_TYPE } from "@yourdash/backend/src/core/coreApiVideo.js";
import ffmpeg from "fluent-ffmpeg";
import IGridItem from "../shared/grid.js";

export default class Video {
  username: string;
  path: string;

  constructor(username: string, photoPath: string) {
    this.username = username;
    this.path = photoPath;

    return this;
  }

  async getDimensions(): Promise<{ width: number; height: number }> {
    return new Promise((resolve) => {
      ffmpeg.ffprobe(this.path, (err, data) => {
        if (err) {
          console.log(err);
        }

        return resolve({
          width: data?.streams[0].width || 0,
          height: data?.streams[0].height || 0,
        });
      });
    });
  }

  getRawPhotoUrl(): string {
    return coreApi.video.createAuthenticatedVideo(this.username, AUTHENTICATED_VIDEO_TYPE.FILE, pth.resolve(this.path));
  }

  async getVideoUrl(): Promise<string> {
    return coreApi.video.createAuthenticatedVideo(this.username, AUTHENTICATED_VIDEO_TYPE.FILE, pth.resolve(this.path));
  }

  async getIGridVideo() {
    const dimensions = await this.getDimensions();

    return {
      dimensions: dimensions,
      itemUrl: await this.getVideoUrl(),
      path: this.path,
      tags: [],
      type: "video",
    } as IGridItem;
  }

  async getIVideo() {
    return {
      dimensions: await this.getDimensions(),
      itemUrl: await this.getVideoUrl(),
      path: this.path,
      tags: [],
      date: "",
      people: [],
      type: "video",
    } as IGridItem;
  }
}
