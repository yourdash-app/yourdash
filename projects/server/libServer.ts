/*
 *   Copyright (c) 2022-2023 Ewsgit
 *   https://ewsgit.mit-license.org
 */

import fs from "fs";
import { ENV } from "./index.js";
import sharp from "sharp";
import { Application, Request, Response } from "express";
import { type YourDashModule } from "./module.js";
import path from "path";
import { generateRandomStringOfLength } from "./encryption.js";

let currentSessionLog = "----- [YOURDASH SERVER LOG] -----\n";

export function log(input: string) {
    console.log(input);
    currentSessionLog += `${input.replaceAll("", "").replaceAll(/\[[0-9][0-9]m/gm, "")}\n`;
    fs.writeFile(`${ENV.FsOrigin}/serverlog.txt`, currentSessionLog, (err) => {
        if (err) {
            console.error(err);
            process.exit();
        }
    });
}

export type extend<Type, TypeExtension> = Type & TypeExtension;

export function returnBase64Image(path: string) {
    return `data:image/png;base64,${fs.readFileSync(path, "base64")}`;
}

export function returnBase64Svg(path: string) {
    return `data:image/svg;base64,${fs.readFileSync(path, "base64")}`;
}

export function base64FromBufferImage(img: Buffer): string {
    return `data:image/png;base64,${img.toString("base64")}`;
}

export function resizeImage(
    width: number,
    height: number,
    image: string,
    callback: (image: string) => void,
    error: () => void
) {
    sharp(image)
        .resize(width, height, {
            kernel: "lanczos3",
            withoutEnlargement: true,
        })
        .png()
        .toBuffer((err, buf) => {
            if (err) {
                console.error(err);
                log(`ERROR: unable to resize image: ${image}`);
                return error();
            }

            const cacheFileName = generateRandomStringOfLength(8);

            try {
                fs.writeFileSync(path.resolve(`${ENV.FsOrigin}/cache/images/${cacheFileName}.png`), buf, {
                    encoding: "binary",
                });
            } catch (e) {
                log(`ERROR: unable to write image file for resize`);
                return "";
            }

            return callback(`${ENV.PublicUrl}api/images/cache/${cacheFileName}`);
        });
}

export class RequestManager {
    private express: Application;

    private module: YourDashModule;

    private endpoints: string[];
    private name: string;

    constructor(app: Application, module: YourDashModule, name: string) {
        this.express = app;
        this.module = module;
        this.endpoints = [];
        this.name = name;
    }

    get = (path: string, cb: (req: Request, res: Response) => void) => {
        this.endpoints.push(`GET ${path}`);
        this.express.get(`/api/${this.name}${path}`, (req, res) => {
            return cb(req, res);
        });
    };

    post = (path: string, cb: (req: Request, res: Response) => void) => {
        this.endpoints.push(`POS ${path}`);
        this.express.post(`/api/${this.name}${path}`, (req, res) => {
            return cb(req, res);
        });
    };

    delete = (path: string, cb: (req: Request, res: Response) => void) => {
        this.endpoints.push(`DEL ${path}`);
        this.express.delete(`/api/${this.name}${path}`, (req, res) => {
            return cb(req, res);
        });
    };

    legacy = () => {
        return this.express;
    };

    getEndpoints = () => {
        return this.endpoints;
    };
}
