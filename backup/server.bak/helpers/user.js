import { ENV } from "../index.js";
import * as path from "path";
import * as fs from "fs";
import { log, resizeImage } from "../libServer.js";
export default class User {
    userName;
    constructor(userName) {
        this.userName = userName;
    }
    getUserPath(userName) {
        return path.resolve(`${ENV.FsOrigin}/data/users/${userName}/`);
    }
    getUserFsPath(userName) {
        return path.resolve(`${ENV.FsOrigin}/data/users/${userName}/fs`);
    }
    getUserName() {
        return this.userName;
    }
    getFullName() {
        try {
            const user = JSON.parse(fs.readFileSync(path.resolve(`${this.getUserPath(this.userName)}/user.json`)).toString());
            return {
                firstName: user.name.first,
                lastName: user.name.last,
            };
        }
        catch (e) {
            log(`ERROR: unable to read ${this.userName}/profile.json`);
            return null;
        }
    }
    getProfileBanner() {
        try {
            const user = JSON.parse(fs.readFileSync(path.resolve(`${this.getUserPath(this.userName)}/user.json`)).toString());
            let output = null;
            resizeImage(1920, 1080, user.profile.banner, (data) => {
                output = data;
            }, () => {
                return null;
            });
            return output;
        }
        catch (e) {
            log(`ERROR: unable to read ${this.userName}/profile.json`);
            return null;
        }
    }
    getProfilePicture(width, height) {
        try {
            const user = JSON.parse(fs.readFileSync(path.resolve(`${this.getUserPath(this.userName)}/user.json`)).toString());
            let output = null;
            resizeImage(width, height, user.profile.image, (data) => {
                output = data;
            }, () => {
                return "TODO_ADD_ERROR_IMAGE";
            });
            return output;
        }
        catch (e) {
            log(`ERROR: unable to read ${this.userName}/profile.json`);
            return null;
        }
    }
    getProfileDescription() {
        try {
            const user = JSON.parse(fs.readFileSync(path.resolve(`${this.getUserPath(this.userName)}/user.json`)).toString());
            return user.profile.description;
        }
        catch (e) {
            log(`ERROR: unable to read ${this.userName}/profile.json`);
            return null;
        }
    }
    getProfileLocation() {
        try {
            const user = JSON.parse(fs.readFileSync(path.resolve(`${this.getUserPath(this.userName)}/user.json`)).toString());
            return {
                value: user.profile.location.value,
                isPublic: user.profile.location.public,
            };
        }
        catch (e) {
            log(`ERROR: unable to read ${this.userName}/profile.json`);
            return null;
        }
    }
    getProfileStatus() {
        try {
            const user = JSON.parse(fs.readFileSync(path.resolve(`${this.getUserPath(this.userName)}/user.json`)).toString());
            return user.profile.status;
        }
        catch (e) {
            log(`ERROR: unable to read ${this.userName}/profile.json`);
            return null;
        }
    }
    getProfileExternalLinks() {
        try {
            const user = JSON.parse(fs.readFileSync(path.resolve(`${this.getUserPath(this.userName)}/user.json`)).toString());
            return user.profile.externalLinks;
        }
        catch (e) {
            log(`ERROR: unable to read ${this.userName}/profile.json`);
            return null;
        }
    }
    getPermissions() {
        try {
            const user = JSON.parse(fs.readFileSync(path.resolve(`${this.getUserPath(this.userName)}/user.json`)).toString());
            return user.permissions;
        }
        catch (e) {
            log(`ERROR: unable to read ${this.userName}/profile.json`);
            return null;
        }
    }
}
