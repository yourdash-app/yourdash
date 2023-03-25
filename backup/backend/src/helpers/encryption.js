"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareHash = exports.hash = exports.generateRandomStringOfLength = exports.decrypt = exports.encrypt = void 0;
var crypto_1 = require("crypto");
var bcrypt_1 = require("bcrypt");
// FIXME: replace me this is a placeholder value!
var INSTANCE_ENCRYPTION_KEY = "test key";
function encrypt(text) {
    var iv = crypto_1.default.randomBytes(25);
    var salt = crypto_1.default.randomBytes(25);
    var key = crypto_1.default.scryptSync(INSTANCE_ENCRYPTION_KEY, salt, 50);
    var cipher = crypto_1.default.createCipheriv("aes-256-cbc", key, iv);
    var encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return "".concat(iv.toString("hex"), ":").concat(salt.toString("hex"), ":").concat(encrypted);
}
exports.encrypt = encrypt;
function decrypt(text) {
    var _a = text.split(":"), ivs = _a[0], salts = _a[1], data = _a[2];
    var iv = Buffer.from(ivs, "hex");
    var salt = Buffer.from(salts, "hex");
    var key = crypto_1.default.scryptSync(INSTANCE_ENCRYPTION_KEY, salt, 50);
    var decipher = crypto_1.default.createDecipheriv("aes-256-cbc", key, iv);
    var decrypted = decipher.update(data, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted.toString();
}
exports.decrypt = decrypt;
function generateRandomStringOfLength(length) {
    var characters = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
    return Array.from({ length: length }, function () { return characters[Math.floor(Math.random() * characters.length)]; }).join("");
}
exports.generateRandomStringOfLength = generateRandomStringOfLength;
function hash(input) {
    return new Promise(function (resolve) {
        var saltRounds = 10;
        bcrypt_1.default.hash(input, saltRounds, function (err, hash) {
            if (err)
                console.error(err);
            resolve(hash);
        });
    });
}
exports.hash = hash;
function compareHash(hash, input) {
    return new Promise(function (resolve) {
        bcrypt_1.default.compare(input, hash, function (err, response) {
            if (err)
                console.error(err);
            resolve(response);
        });
    });
}
exports.compareHash = compareHash;
