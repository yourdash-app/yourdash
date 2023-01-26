import fs from 'fs';
import { ENV } from './index.js';
import sharp from 'sharp';
let currentSessionLog = '----- [YOURDASH SERVER LOG] -----\n';
export function log(input) {
    console.log(input);
    currentSessionLog += `${input.replaceAll('', '').replaceAll(/\[[0-9][0-9]m/gm, '')}\n`;
    fs.writeFile(`${ENV.FsOrigin}/serverlog.txt`, currentSessionLog, err => {
        if (err) {
            console.error(err);
            process.exit();
        }
    });
}
export function returnBase64Image(path) {
    return `data:image/png;base64,${fs.readFileSync(path, 'base64')}`;
}
export function returnBase64Svg(path) {
    return `data:image/svg;base64,${fs.readFileSync(path, 'base64')}`;
}
export function base64FromBufferImage(img) {
    const base64 = `data:image/png;base64,${img.toString("base64")}`;
    return base64;
}
export function resizeImage(width, height, image, callback, error) {
    sharp(image)
        .resize(width, height, {
        kernel: "lanczos3",
        withoutEnlargement: true
    })
        .png()
        .toBuffer((err, buf) => {
        if (err) {
            console.log(err);
            log(`ERROR: unable to resize image: ${image}`);
            return error();
        }
        log(`Triggered Sharp, width: ${width}, height: ${height}`);
        return callback(base64FromBufferImage(buf));
    });
}
export class RequestManager {
    express;
    module;
    endpoints;
    constructor(app, module) {
        this.express = app;
        this.module = module;
        this.endpoints = [];
    }
    get = (path, cb) => {
        this.endpoints.push(`GET ${path}`);
        this.express.get(`/api/${this.module.name}${path}`, (req, res) => cb(req, res));
    };
    post = (path, cb) => {
        this.endpoints.push(`POS ${path}`);
        this.express.post(`/api/${this.module.name}${path}`, (req, res) => cb(req, res));
    };
    delete = (path, cb) => {
        this.endpoints.push(`DEL ${path}`);
        this.express.delete(`/api/${this.module.name}${path}`, (req, res) => cb(req, res));
    };
    legacy = () => this.express;
    getEndpoints = () => this.endpoints;
}
