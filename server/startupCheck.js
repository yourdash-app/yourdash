import fs from 'fs';
import path from 'path';
import { encrypt } from './encryption.js';
import { ENV } from './index.js';
import { log, returnBase64Image } from './libServer.js';
let stepCount = 3;
let currentStep = 0;
function increaseStep(cb) {
    currentStep++;
    if (currentStep >= stepCount) {
        cb();
    }
}
export default async function main(cb) {
    if (!fs.existsSync(path.resolve(ENV.FS_ORIGIN))) {
        fs.mkdir(ENV.FS_ORIGIN, { recursive: true }, (err) => {
            if (err)
                return console.error(err);
            increaseStep(cb);
        });
    }
    else {
        increaseStep(cb);
    }
    if (!fs.existsSync(path.resolve(`${ENV.FS_ORIGIN}/yourdash.config.json`))) {
        let chars = 'ABCDEF0123456789';
        let keyString = '';
        for (let i = 0; i < 64; i++) {
            keyString += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        fs.writeFile(path.resolve(`${ENV.FS_ORIGIN}/yourdash.config.json`), JSON.stringify({
            activeModules: ['userManagement', 'core'],
            defaultBackground: '',
            favicon: '',
            instanceEncryptionKey: keyString,
            logo: `../yourdash.svg`,
            name: 'YourDash Instance',
            themeColor: '#a46',
            version: '0.1.0',
            loginPageConfig: {
                background: {
                    src: '',
                },
                logo: {
                    src: '',
                    position: {
                        bottom: null,
                        left: null,
                        right: null,
                        top: null,
                    },
                },
                message: {
                    content: '',
                    position: {
                        bottom: null,
                        left: null,
                        right: null,
                        top: null,
                    },
                },
            },
        }), () => {
            log(`config file was created in the data origin directory.`);
            increaseStep(cb);
        });
    }
    else {
        increaseStep(cb);
    }
    if (!fs.existsSync(path.resolve(`${ENV.FS_ORIGIN}/data/users/admin/user.json`))) {
        fs.mkdir(path.resolve(`${ENV.FS_ORIGIN}/data/users/admin/`), { recursive: true }, (err) => {
            if (err)
                return log(`${err}`);
            fs.writeFile(`${ENV.FS_ORIGIN}/data/users/admin/user.json`, JSON.stringify({
                version: '1',
                name: { first: 'Admin', last: 'istrator' },
                userName: 'admin',
                profile: {
                    banner: '',
                    description: '',
                    image: returnBase64Image(path.resolve(`${ENV.FS_ORIGIN}/../default_user_profile.png`)),
                    location: {
                        public: false,
                        value: '',
                    },
                    status: { public: false, value: '' },
                    externalLinks: {},
                },
            }), (err) => {
                if (err)
                    return log(`${err}`);
                const SERVER_CONFIG = JSON.parse(fs.readFileSync(path.resolve(`${ENV.FS_ORIGIN}/yourdash.config.json`)).toString());
                fs.writeFile(path.resolve(`${ENV.FS_ORIGIN}/data/users/admin/keys.json`), JSON.stringify({
                    hashedKey: encrypt('admin', SERVER_CONFIG),
                }), (err) => {
                    if (err) {
                        log(`${err}`);
                        throw new Error(`ERROR in startupCheck (during admin credential generation): ${err}`);
                    }
                    fs.writeFile(`${ENV.FS_ORIGIN}/data/users/admin/config.json`, JSON.stringify({
                        panel: {
                            launcher: {
                                shortcuts: [
                                    {
                                        icon: returnBase64Image(path.resolve(`${ENV.FS_ORIGIN}/../yourdash256.png`)),
                                        name: 'Dashboard',
                                        url: '/app/dash',
                                    },
                                ],
                            },
                        },
                    }), (err) => {
                        if (err) {
                            log(`${err}`);
                            throw new Error(`ERROR in startupCheck (during admin default configuration generation): ${err}`);
                        }
                        increaseStep(cb);
                    });
                });
            });
        });
    }
    else {
        increaseStep(cb);
    }
}
