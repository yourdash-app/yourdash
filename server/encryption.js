import crypto from 'crypto';
import path from 'path';
import { ENV } from './index.js';
import fs from 'fs';
const SERVER_CONFIG = JSON.parse(fs.readFileSync(path.resolve(`${ENV.FS_ORIGIN}/yourdash.config.json`))?.toString());
export function encrypt(text) {
    let iv = crypto.randomBytes(16);
    let salt = crypto.randomBytes(16);
    let key = crypto.scryptSync(SERVER_CONFIG.instanceEncryptionKey, salt, 32);
    let cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${salt.toString('hex')}:${encrypted}`;
}
export function decrypt(text) {
    let [ivs, salts, data] = text.split(':');
    let iv = Buffer.from(ivs, 'hex');
    let salt = Buffer.from(salts, 'hex');
    let key = crypto.scryptSync(SERVER_CONFIG.instanceEncryptionKey, salt, 32);
    let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted.toString();
}
export function generateRandomStringOfLength(len) {
    const chars = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890';
    const randomArray = Array.from({ length: len }, (v, k) => chars[Math.floor(Math.random() * chars.length)]);
    const randomString = randomArray.join('');
    return randomString;
}
