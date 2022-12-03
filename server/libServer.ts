import fs from 'fs';
import { ENV } from './index.js';

let currentSessionLog = '----- [YOURDASH SERVER LOG] -----\n';

export function log(input: string) {
  console.log(input);
  currentSessionLog += `${input.replaceAll('', '').replaceAll(/\[[0-9][0-9]m/gm, "")}\n`;
  fs.writeFile(`${ENV.FS_ORIGIN}/serverlog.txt`, currentSessionLog, (err) => {
    if (err) {
      console.error(err);
      process.exit();
    }
  });
}

export function returnBase64Image(path: string) {
  return 'data:image/gif;base64,' + fs.readFileSync(path, 'base64');
}
