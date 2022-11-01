import fs from 'fs';
import { ENV } from './index.js';
import { log } from './libServer.js';
export default function main() {
    if (!fs.readFileSync(`${ENV.FS_ORIGIN}/yourdash.config.json`))
        fs.writeFile(`${ENV.FS_ORIGIN}/yourdash.config.json`, "{}", () => {
            log(`config file was created in the data origin directory.`);
        });
}
