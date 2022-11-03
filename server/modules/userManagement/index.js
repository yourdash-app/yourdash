import fs from 'fs';
import { ENV } from '../../index.js';
export default class YourDashModule {
    name = 'userManagement';
    id = 'test@ewsgit.github.io';
    load(app) {
        app.post('/api/user/create/:username', (req, res) => {
            let { username } = req.params;
            fs.mkdir(`${ENV.FS_ORIGIN}/data/users/${username}/`, { recursive: true }, (err) => {
                if (err)
                    return res.sendStatus(500);
                fs.writeFile(`${ENV.FS_ORIGIN}/data/users/${username}/user.json`, JSON.stringify({
                    name: 'Ethan',
                    userName: 'ewsgit',
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
                    fs.writeFile(`${ENV.FS_ORIGIN}/data/users/${username}/keys.json`, JSON.stringify({
                        hashedPass: "11235"
                    }), (err) => {
                        if (err)
                            return res.sendStatus(500);
                        return res.send(`hello new user ${req.params.username}`);
                    });
                });
            });
        });
    }
    unload() { }
    install() { }
}
