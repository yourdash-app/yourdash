import crypto from 'crypto';
import { YourDashServerConfig } from '.';

export function encrypt(text: string, SERVER_CONFIG: YourDashServerConfig) {
  let iv = crypto.randomBytes(16);
  let salt = crypto.randomBytes(16);
  let key = crypto.scryptSync(SERVER_CONFIG.instanceEncryptionKey, salt, 32);

  let cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return `${iv.toString('hex')}:${salt.toString('hex')}:${encrypted}`;
}

export function decrypt(text: string, SERVER_CONFIG: YourDashServerConfig) {
  let [ivs, salts, data] = text.split(':');
  let iv = Buffer.from(ivs, 'hex');
  let salt = Buffer.from(salts, 'hex');
  let key = crypto.scryptSync(SERVER_CONFIG.instanceEncryptionKey, salt, 32);

  let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(data, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted.toString();
}

export function generateRandomStringOfLength(len: number) {
  const chars = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890';
  const randomArray = Array.from(
    { length: len },
    (_v, _k) => chars[Math.floor(Math.random() * chars.length)]
  );

  const randomString = randomArray.join('');
  return randomString;
}
