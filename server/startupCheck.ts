import fs from 'fs';
import { ENV } from './index.js';
import { log } from './libServer.js';
import chalk from "chalk"

export default function main() {
  /*
    config file
    users
    groups
    admin user exists
  */
  if (!fs.readFileSync(`${ENV.FS_ORIGIN}/yourdash.config.json`))
    fs.writeFile(`${ENV.FS_ORIGIN}/yourdash.config.json`, "{}", () => {
      log(`config file was created in the data origin directory.`)
    })
}
