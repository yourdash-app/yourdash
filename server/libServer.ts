import fs from 'fs';
import {ENV} from "./index.js"

let currentSessionLog = '----- [YOURDASH SERVER LOG] -----\n';

export function log(input: string) {
  console.log(input);
  currentSessionLog += `${input}\n`;
  fs.writeFile(`${ENV.FS_ORIGIN}/serverlog.txt`, currentSessionLog, (err) => {
    if (err) {
      console.error(err);
      process.exit();
    }
  });
}
