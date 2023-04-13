import { promises as fs, existsSync } from 'fs';
import path from 'path';

import sharp from 'sharp';

import { hash } from './encryption.js';

export enum YourDashUserPermissions {
  Administrator, CreateFiles, DeleteFiles,
}

export interface IYourDashUser {
  username: string;
  fullName: { first: string; last: string };
  permissions: YourDashUserPermissions[];
  contacts: string[]; // an array of user's usernames
}

export default class YourDashUser {
  username: string;
  user: IYourDashUser;

  constructor(username: string) {
    this.username = username;

    if (!this.exists()) {
      return;
    }

    this.read();
    return this;
  }

  setPassword(password: string): this {
    try {
      hash(password).then(result => {
        fs.writeFile(path.resolve(this.getPath(), './password.txt'), result);
      });
    } catch (err) {
      console.error(`unable to set password for user: ${ this.username }`);
    }

    return this;
  }

  verifyUserConfig(): this {
    // checks all properties of this.user to make sure that they match IYourDashUser
    if (!this.user) {
      // @ts-ignore
      this.user = {};
    }
    if (!this.user.fullName) {
      this.user.fullName = { first: 'New', last: 'User' };
    }
    if (!this.user.permissions) {
      this.user.permissions = [];
    }
    if (!this.user.contacts) {
      this.user.contacts = [];
    }

    return this;
  }

  generateAvatars(): this {
    sharp(fs.readFileSync(path.resolve(this.getPath(), 'avatar.avif'))).resize(32, 32).toFile(path.resolve(
      this.getPath(),
      'micro_avatar.avif',
    )).catch(err => console.error(err));

    return this;
  }

  getPath(): string {
    return path.resolve(process.cwd(), `./fs/users/${ this.username }/`);
  }

  getName(): { first: string; last: string } {
    return this.user.fullName;
  }

  exists(): boolean {
    return fs.existsSync(this.getPath());
  }

  write() {
    if (!fs.existsSync(this.getPath())) {
      fs.mkdirSync(this.getPath(), { recursive: true });
      fs.cpSync(path.resolve(process.cwd(), './default/avatar.avif'),
        path.resolve(this.getPath(), 'avatar.avif'),
      );
      hash('password').then(response => {
        fs.writeFileSync(path.resolve(this.getPath(), './password.txt'), response);
      });
      fs.writeFileSync(path.resolve(this.getPath(), './quick-shortcuts.json'), JSON.stringify([]));
    }

    try {
      fs.writeFileSync(path.join(this.getPath(), 'user.json'), JSON.stringify(this.user));
    } catch (err) {
      console.error('Error writing user to disk!', err);
    }
  }

  async read(): Promise<this> {
    try {
      this.user = JSON.parse((await fs.readFile(path.join(this.getPath(), 'user.json'))).toString());
    } catch (err) {
      console.error('Error reading user from disk!', err);
    }
    return this;
  }

  hasPermission(perm: YourDashUserPermissions): boolean {
    return this.user.permissions.indexOf(perm) !== -1;
  }

  addPermission(perm: YourDashUserPermissions): this {
    this.user.permissions.push(perm);

    return this;
  }

  setName(name: { first: string; last: string }): this {
    this.user.fullName = name;
    return this;
  }
}
