/*
 *   Copyright (c) 2022 Ewsgit
 *   https://ewsgit.mit-license.org
 */
import express from 'express';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
export const ENVIRONMENT_VARS = {
    FS_ORIGIN: process.env.FS_ORIGIN,
};
export const SERVER_CONFIG = JSON.parse(fs.readFileSync(path.join(ENVIRONMENT_VARS.FS_ORIGIN, './yourdash.config.json')).toString());
console.log(SERVER_CONFIG);
const app = express();
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
SERVER_CONFIG.activeModules.forEach((module) => {
    import('./modules/' + module + '/index.js').then((mod) => {
        let currentModule = new mod.default();
        currentModule.load(app);
        console.log('loaded module: ' + module);
    });
});
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://yourdash.vercel.app',
        'https://ddsh.vercel.app',
    ],
}));
function verifyGithubUserToken() {
}
// app.use((req, res, next) => {
//   if (req.url.startsWith('/api') || req.url.startsWith('/dav')) {
//     let userName = req.header('userName')
//     let userToken = req.header('userToken')
//     fs.readFile(`${ENVIRONMENT_VARS.FS_ORIGIN}/data/users/${userName}/`, (err, data) => {
//     })  
//   } else {
//     next();
//   }
// });
app.get('/', (req, res) => {
    res.redirect(`https://yourdash.vercel.app/login/server/${req.url}`);
});
// this is used during the login page to check if the provided url is a yourdash instance
app.get('/test', (req, res) => {
    res.send('yourdash instance');
});
app.get('/api/get/server/config', (req, res) => {
    res.sendFile(path.resolve(`${ENVIRONMENT_VARS.FS_ORIGIN}/yourdash.config.json`));
});
app.get('/login/user/:username', (req, res) => {
    if (!req.params.username)
        return;
});
// the following section of code is for nextcloud application compatability.
app.get('/nextcloud/remote.php/dav/files/:username', (req, res) => { });
app.listen(80, () => {
    console.log('YourDash Server instance live on 127.0.0.1');
});
