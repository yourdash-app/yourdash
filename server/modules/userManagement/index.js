import fs from 'fs';
import { ENV } from '../../index.js';
import crypto from 'crypto';
import path from 'path';
let USER_CACHE = {};
const Module = {
    name: 'userManagement',
    id: 'userManagement',
    load(app, api) {
        app.use((req, res, next) => {
            if (req.headers?.userName) {
                let userName = req.headers.userName;
                let sessionToken = req.headers.sessionToken;
                if (USER_CACHE[userName]) {
                    if (USER_CACHE[userName] === sessionToken) {
                        next();
                    }
                    else {
                        return res.sendStatus(401);
                    }
                }
                else {
                    fs.readFile(path.resolve(`${ENV.FS_ORIGIN}/data/users/${userName}/keys.json`), (err, data) => {
                        if (err)
                            return res.sendStatus(404);
                        USER_CACHE[userName] = JSON.parse(data.toString()).sessionKey;
                        if (USER_CACHE[userName] === sessionToken) {
                            next();
                        }
                    });
                }
            }
        });
        app.post('/api/user/create/:username', (req, res) => {
            let { username } = req.params;
            let password = req.headers.password;
            console.log(password);
            if (!password)
                return res.sendStatus(500);
            fs.mkdir(`${ENV.FS_ORIGIN}/data/users/${username}/`, { recursive: true }, (err) => {
                if (err)
                    return res.sendStatus(500);
                fs.writeFile(`${ENV.FS_ORIGIN}/data/users/${username}/user.json`, JSON.stringify({
                    name: 'name',
                    userName: 'username',
                    profile: {
                        banner: '',
                        description: '',
                        externalLinks: {
                            git: '',
                            twitter: '',
                            youtube: '',
                        },
                    },
                }), (err) => {
                    if (err)
                        return res.sendStatus(500);
                    let key = crypto.createCipheriv('aes-256-ocb', api.SERVER_CONFIG.instanceEncryptionKey, null);
                    fs.writeFile(`${ENV.FS_ORIGIN}/data/users/${username}/keys.json`, JSON.stringify({
                        hashedKey: key.update(password, 'utf-8', 'hex'),
                        sessionKey: '',
                    }), (err) => {
                        if (err)
                            return res.sendStatus(500);
                        fs.writeFile(`${ENV.FS_ORIGIN}/data/users/${username}/config.json`, JSON.stringify({
                            panel: {
                                launcher: {
                                    shortcuts: [
                                        {
                                            icon: URL.createObjectURL(new Blob([fs.readFileSync(`${ENV.FS_ORIGIN}/yourdash.svg`)])),
                                        },
                                    ],
                                },
                            },
                        }), (err) => {
                            if (err)
                                return res.sendStatus(500);
                            return res.send(`hello new user ${req.params.username}`);
                        });
                    });
                });
            });
        });
        app.get('/api/user/login', (req, res) => {
            let { userName, password } = req.headers;
            console.log({ userName, password });
            if (!userName || !password)
                return res.sendStatus(401);
            fs.readFile(`${ENV.FS_ORIGIN}/data/users/${userName}/keys.json`, (err, data) => {
                if (err)
                    return res.sendStatus(404);
                let sessionToken = JSON.parse(data.toString());
                let decipher = crypto.createDecipheriv('aes-256-ocb', api.SERVER_CONFIG.instanceEncryptionKey, null);
                let userToken = decipher.update(password, 'utf-8', 'hex');
                if (userToken !== sessionToken)
                    return res.sendStatus(403);
                return res.send();
            });
        });
        app.get('/api/get/current/user', (req, res) => {
            fs.readFile(`${ENV.FS_ORIGIN}/data/users/${req.header('userName')}/user.json`, (err, data) => {
                if (err)
                    return res.sendStatus(404);
                return res.send(data);
            });
        });
    },
    unload() { },
    install() { },
};
export default Module;
