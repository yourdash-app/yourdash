/*
 *   Copyright (c) 2022 Ewsgit
 *   All rights reserved.

 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 */
import express from 'express';
import chalk from 'chalk';
import { readFileSync } from 'fs';
import path from 'path';
export const ENVIRONMENT_VARS = {
    FS_ORIGIN: process.env.FS_ORIGIN,
};
export const SERVER_CONFIG = await JSON.parse(readFileSync(path.join(ENVIRONMENT_VARS.FS_ORIGIN, './yourdash.config.json')).toString());
const app = express();
console.log(JSON.parse(readFileSync(path.join(ENVIRONMENT_VARS.FS_ORIGIN, './yourdash.config.json')).toString()));
if (SERVER_CONFIG.name === undefined ||
    SERVER_CONFIG.defaultBackground === undefined ||
    SERVER_CONFIG.favicon === undefined ||
    SERVER_CONFIG.logo === undefined ||
    SERVER_CONFIG.themeColor === undefined ||
    SERVER_CONFIG.activeModules === undefined ||
    SERVER_CONFIG.version === undefined) {
    console.log(chalk.redBright('Missing configuration!'));
    process.exit(1);
}
SERVER_CONFIG.activeModules.forEach(module => {
    import("./modules/" + module + "/index.js").then(mod => {
        mod.load(app);
    });
});
app.get('/', (req, res) => {
    res.redirect(`https://yourdash.vercel.app/login/server/${req.url}`);
});
app.get('/dav/version', (req, res) => {
    res.send(SERVER_CONFIG.version);
});
app.listen(80, () => {
    console.log('YourDash Server instance live on 127.0.0.1');
});
