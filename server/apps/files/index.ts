import { type YourDashApplicationServerPlugin } from "~/core/applications.js";

const main: YourDashApplicationServerPlugin = () => {
  return console.log(`hello world from the 'files'`);
};

export default main;
