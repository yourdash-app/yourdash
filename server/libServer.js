import fs from 'fs';
import { ENV } from './index.js';
let currentSessionLog = '----- [YOURDASH SERVER LOG] -----\n';
export function log(input) {
    console.log(input);
    currentSessionLog += `${input}\n`;
    fs.writeFile(`${ENV.FS_ORIGIN}/serverlog.txt`, currentSessionLog, (err) => {
        if (err) {
            console.error(err);
            process.exit();
        }
    });
}
export function returnBase64Image(path) {
    return 'data:image/gif;base64,' + fs.readFileSync(path, 'base64');
}
