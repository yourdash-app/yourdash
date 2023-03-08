import { ENV } from "../index.js";
import * as path from "path";
import * as fs from "fs";
import { YourDashUser, YourDashUserPermissions } from "types/core/user.js";
import { log, resizeImage } from "../libServer.js";

export default class User {
    userName: string;

    constructor(userName: string) {
        this.userName = userName;
    }

    getUserPath(userName: string): string {
        return path.resolve(`${ENV.FsOrigin}/data/users/${userName}/`);
    }

    getUserFsPath(userName: string): string {
        return path.resolve(`${ENV.FsOrigin}/data/users/${userName}/fs`);
    }

    getUserName(): string {
        return this.userName;
    }

    getFullName(): { firstName: string; lastName: string } | null {
        try {
            const user: YourDashUser = JSON.parse(
                fs.readFileSync(path.resolve(`${this.getUserPath(this.userName)}/user.json`)).toString()
            );

            return {
                firstName: user.name.first,
                lastName: user.name.last,
            };
        } catch (e) {
            log(`ERROR: unable to read ${this.userName}/profile.json`);
            return null;
        }
    }

    getProfileBanner(): string | null {
        try {
            const user: YourDashUser = JSON.parse(
                fs.readFileSync(path.resolve(`${this.getUserPath(this.userName)}/user.json`)).toString()
            );

            resizeImage(
                1920,
                1080,
                user.profile.banner,
                (data: string) => {
                    return data;
                },
                () => {
                    return null;
                }
            );
        } catch (e) {
            log(`ERROR: unable to read ${this.userName}/profile.json`);
            return null;
        }
    }

    getProfilePicture(width: number, height: number): string | null {
        try {
            const user: YourDashUser = JSON.parse(
                fs.readFileSync(path.resolve(`${this.getUserPath(this.userName)}/user.json`)).toString()
            );

            resizeImage(
                width,
                height,
                user.profile.image,
                (data) => {
                    return data;
                },
                () => {
                    return "TODO_ADD_ERROR_IMAGE";
                }
            );
        } catch (e) {
            log(`ERROR: unable to read ${this.userName}/profile.json`);
            return null;
        }
    }

    getProfileDescription(): string | null {
        try {
            const user: YourDashUser = JSON.parse(
                fs.readFileSync(path.resolve(`${this.getUserPath(this.userName)}/user.json`)).toString()
            );

            return user.profile.description;
        } catch (e) {
            log(`ERROR: unable to read ${this.userName}/profile.json`);
            return null;
        }
    }

    getProfileLocation(): { value: string; isPublic: boolean } | null {
        try {
            const user: YourDashUser = JSON.parse(
                fs.readFileSync(path.resolve(`${this.getUserPath(this.userName)}/user.json`)).toString()
            );

            return {
                value: user.profile.location.value,
                isPublic: user.profile.location.public,
            };
        } catch (e) {
            log(`ERROR: unable to read ${this.userName}/profile.json`);
            return null;
        }
    }

    getProfileStatus(): string | null {
        try {
            const user: YourDashUser = JSON.parse(
                fs.readFileSync(path.resolve(`${this.getUserPath(this.userName)}/user.json`)).toString()
            );

            return user.profile.status;
        } catch (e) {
            log(`ERROR: unable to read ${this.userName}/profile.json`);
            return null;
        }
    }

    getProfileExternalLinks() {
        try {
            const user: YourDashUser = JSON.parse(
                fs.readFileSync(path.resolve(`${this.getUserPath(this.userName)}/user.json`)).toString()
            );

            return user.profile.externalLinks;
        } catch (e) {
            log(`ERROR: unable to read ${this.userName}/profile.json`);
            return null;
        }
    }

    getPermissions(): YourDashUserPermissions[] | null {
        try {
            const user: YourDashUser = JSON.parse(
                fs.readFileSync(path.resolve(`${this.getUserPath(this.userName)}/user.json`)).toString()
            );

            return user.permissions;
        } catch (e) {
            log(`ERROR: unable to read ${this.userName}/profile.json`);
            return null;
        }
    }
}
