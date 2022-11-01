import express from 'express';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { log } from './libServer.js';
export const ENV = {
    FS_ORIGIN: process.env.FS_ORIGIN,
};
if (!ENV.FS_ORIGIN)
    console.error('FS_ORIGIN was not defined.');
export const SERVER_CONFIG = JSON.parse(fs.readFileSync(path.join(ENV.FS_ORIGIN, './yourdash.config.json')).toString());
log(JSON.stringify(SERVER_CONFIG));
if (SERVER_CONFIG.name === undefined ||
    SERVER_CONFIG.defaultBackground === undefined ||
    SERVER_CONFIG.favicon === undefined ||
    SERVER_CONFIG.logo === undefined ||
    SERVER_CONFIG.themeColor === undefined ||
    SERVER_CONFIG.activeModules === undefined ||
    SERVER_CONFIG.version === undefined) {
    log(chalk.redBright('Missing configuration!, the configuration requires at least the properties: \nname,\ndefaultBackground,\nfavicon,\nlogo,\nthemeColor,\nactiveModules,\nversion'));
    process.exit(1);
}
if (!SERVER_CONFIG.activeModules.includes('core'))
    console.error(chalk.redBright(`[ERROR] the 'core' module is not enabled, this ${chalk.bold('WILL')} lead to missing features and crashes.`));
const app = express();
SERVER_CONFIG.activeModules.forEach((module) => {
    import('./modules/' + module + '/index.js').then((mod) => {
        let currentModule = new mod.default();
        currentModule.load(app);
        log('loaded module: ' + module);
    });
});
app.use((req, res, next) => {
    let date = new Date();
    switch (req.method) {
        case 'GET':
            log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds() < 10 ? date.getSeconds() + '0' : date.getSeconds()} ${chalk.bgGrey(chalk.green(' GET '))} ${req.path}`);
            break;
        case 'POST':
            log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds() < 10 ? date.getSeconds() + '0' : date.getSeconds()} ${chalk.bgGrey(chalk.blue(' GET '))} ${req.path}`);
            break;
        case 'DELETE':
            log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds() < 10 ? date.getSeconds() + '0' : date.getSeconds()} ${chalk.bgGrey(chalk.red(' DELETE '))} ${req.path}`);
            break;
    }
    next();
});
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://yourdash.vercel.app',
        'https://ddsh.vercel.app',
    ],
}));
app.get('/', (req, res) => {
    res.redirect(`https://yourdash.vercel.app/login/server/${req.url}`);
});
app.get('/test', (_req, res) => {
    res.send('yourdash instance');
});
app.get('/api/get/server/config', (_req, res) => {
    res.sendFile(path.resolve(`${ENV.FS_ORIGIN}/yourdash.config.json`));
});
app.get('/api/get/server/default/background', (_req, res) => {
    res.sendFile(path.resolve(`${ENV.FS_ORIGIN}/${SERVER_CONFIG.defaultBackground}`));
});
app.get('/api/get/server/favicon', (_req, res) => {
    res.sendFile(path.resolve(`${ENV.FS_ORIGIN}/${SERVER_CONFIG.favicon}`));
});
app.get('/api/get/logo', (_req, res) => {
    res.sendFile(path.resolve(`${ENV.FS_ORIGIN}/${SERVER_CONFIG.logo}`));
});
app.get('/api/get/current/user', (req, res) => {
    let user = JSON.parse(fs
        .readFileSync(`${ENV.FS_ORIGIN}/data/users/${req.header('userName')}/user.json`)
        .toString());
    res.json(user);
});
app.get('/api/server/version', (_req, res) => {
    res.send(SERVER_CONFIG.version);
});
app.get('/login/user/:username', (req, _res) => {
    if (!req.params.username)
        return;
});
app.get('/nextcloud/remote.php/dav/files/:username', (_req, _res) => { });
app.listen(80, () => {
    log('Server online :D');
});
