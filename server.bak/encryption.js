import crypto from "crypto";
export function encrypt(text, SERVER_CONFIG) {
    const iv = crypto.randomBytes(16);
    const salt = crypto.randomBytes(16);
    const key = crypto.scryptSync(SERVER_CONFIG.instanceEncryptionKey, salt, 32);
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return `${iv.toString("hex")}:${salt.toString("hex")}:${encrypted}`;
}
export function decrypt(text, SERVER_CONFIG) {
    const [ivs, salts, data] = text.split(":");
    const iv = Buffer.from(ivs, "hex");
    const salt = Buffer.from(salts, "hex");
    const key = crypto.scryptSync(SERVER_CONFIG.instanceEncryptionKey, salt, 32);
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decrypted = decipher.update(data, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted.toString();
}
export function generateRandomStringOfLength(len) {
    const chars = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
    const randomArray = Array.from({ length: len }, (_v, _k) => {
        return chars[Math.floor(Math.random() * chars.length)];
    });
    const randomString = randomArray.join("");
    return randomString;
}
