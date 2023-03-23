import { FILESYSTEM_ROOT } from "../../index.js";
import path from "path";
import Fs from "../../fileSystem/fileSystem.js";
import { hash } from "../encryption.js";
import * as fs from "fs";
const User = {
    create(username, password, options) {
        const userFolder = Fs.createFolder(this.getPath(username)).write();
        userFolder.createFile(`user.json`).setContent(JSON.stringify({
            name: options.name,
            username: username,
            permissions: options.permissions
        })).write();
        hash(password).then(pass => {
            userFolder.createFile(`password.enc`).setContent(pass).write();
        });
        userFolder.createFile(`avatar`).setContent(fs.readFileSync(path.resolve(`${FILESYSTEM_ROOT}/../src/defaultAssets/avatar.png`))).write();
    },
    remove(username) {
        Fs.openFolder(this.getPath(username)).delete();
    },
    getPath(username) {
        return path.join(FILESYSTEM_ROOT, `/users/`, username);
    }
};
export default User;
