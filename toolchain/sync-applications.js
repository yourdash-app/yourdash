import fs from "fs";
import path from "node:path";

function sync() {
  console.log(`Syncing applications!`);
  let apps = fs.readdirSync(path.resolve(`./apps/`));

  apps.forEach((app) => {
    if (!fs.existsSync(path.resolve(`./apps/${app}/client`)))
      return console.error(`Application ${app} requires a ./client/ directory`);

    if (!fs.existsSync(path.resolve(`./apps/${app}/server`)))
      return console.error(`Application ${app} requires a ./server/ directory`);

    if (!fs.existsSync(path.resolve(`./apps/${app}/client/src/index.tsx`)))
      return console.error(
        `Application ${app} requires a ./client/src/index.tsx file`
      );

    if (!fs.existsSync(path.resolve(`./apps/${app}/server/src/index.ts`)))
      return console.error(
        `Application ${app} requires a ./server/src/index.ts file`
      );

    if (!fs.existsSync(path.resolve(`./apps/${app}/client/src`)))
      return console.error(
        `Application ${app} requires a ./client/src/ directory`
      );

    if (!fs.existsSync(path.resolve(`./apps/${app}/server/src`)))
      return console.error(
        `Application ${app} requires a ./server/src/ directory`
      );

    if (!fs.existsSync(path.resolve(`./apps/${app}/application.json`))) {
      try {
        fs.writeFileSync(
          path.resolve(`./apps/${app}/application.json`),
          JSON.stringify(
            {
              name: app,
              displayName: app.slice(0, 1).toUpperCase() + app.slice(1),
              description:
                "This is the default application description, you can edit this information in this" +
                " application's 'application.json'",
            },
            null,
            2
          )
        );
        console.log(
          `An application.json file was added to the '${app}' application`
        );
      } catch (e) {
        console.error(e);
        setTimeout(() => {
          sync();
        }, 1000);
      }
    }

    if (!fs.existsSync(path.resolve(`./client/src/app/apps/${app}`)))
      fs.mkdirSync(path.resolve(`./client/src/app/apps/${app}`), {
        recursive: true,
      });

    if (!fs.existsSync(path.resolve(`./server/apps/${app}`))) {
      try {
        fs.mkdirSync(path.resolve(`./server/apps/${app}`), { recursive: true });
      } catch (e) {
        console.log(`an error occurred retrying now!`);
        setTimeout(() => {
          sync();
        }, 1000);
      }
    }

    if (!fs.existsSync(path.resolve(`./apps/${app}/client/node_modules`))) {
      try {
        fs.symlinkSync(
          path.resolve(`./client/node_modules`),
          path.resolve(`./apps/${app}/client/node_modules`)
        );
      } catch (e) {
        console.log(`an error occurred retrying now!`);
        setTimeout(() => {
          sync();
        }, 1000);
      }
    }

    if (!fs.existsSync(path.resolve(`./apps/${app}/server/node_modules`))) {
      try {
        fs.symlinkSync(
          path.resolve(`./server/node_modules`),
          path.resolve(`./apps/${app}/server/node_modules`)
        );
      } catch (e) {
        console.log(`an error occurred retrying now!`);
        setTimeout(() => {
          sync();
        }, 1000);
      }
    }

    try {
      fs.cpSync(
        path.resolve(`./client/tsconfig.json`),
        path.resolve(`./apps/${app}/client/tsconfig.json`)
      );
    } catch (e) {
      console.log(`an error occurred retrying now!`);
      setTimeout(() => {
        sync();
      }, 1000);
    }

    try {
      fs.cpSync(
        path.resolve(`./server/tsconfig.json`),
        path.resolve(`./apps/${app}/server/tsconfig.json`)
      );
    } catch (e) {
      console.log(`an error occurred retrying now!`);
      setTimeout(() => {
        sync();
      }, 1000);
    }

    try {
      fs.cpSync(
        path.resolve(`./client/package.json`),
        path.resolve(`./apps/${app}/client/package.json`)
      );
    } catch (e) {
      console.log(`an error occurred retrying now!`);
      setTimeout(() => {
        sync();
      }, 1000);
    }

    try {
      fs.cpSync(
        path.resolve(`./server/package.json`),
        path.resolve(`./apps/${app}/server/package.json`)
      );
    } catch (e) {
      console.log(`an error occurred retrying now!`);
      setTimeout(() => {
        sync();
      }, 1000);
    }

    try {
      fs.cpSync(
        path.resolve(`./apps/${app}/client/src/`),
        path.resolve(`./client/src/app/apps/${app}`),
        {
          recursive: true,
          verbatimSymlinks: true,
        }
      );
    } catch (e) {
      console.error(e);
      setTimeout(() => {
        sync();
      }, 1000);
    }

    try {
      fs.cpSync(
        path.resolve(`./apps/${app}/server/src/`),
        path.resolve(`./server/apps/${app}`),
        {
          recursive: true,
          verbatimSymlinks: true,
        }
      );
    } catch (e) {
      console.error(e);
      setTimeout(() => {
        sync();
      }, 1000);
    }

    try {
      fs.copyFileSync(
        path.resolve(`./apps/${app}/application.json`),
        path.resolve(`./server/apps/${app}/application.json`)
      );
    } catch (e) {
      console.error(e);
      setTimeout(() => {
        sync();
      }, 1000);
    }

    try {
      fs.copyFileSync(
        path.resolve(`./apps/${app}/icon.avif`),
        path.resolve(`./server/apps/${app}/icon.avif`)
      );
    } catch (e) {
      console.error(e);
      setTimeout(() => {
        sync();
      }, 1000);
    }
  });
  try {
    fs.writeFileSync(
      path.resolve(`./client/src/app/ApplicationIndex.tsx`),
      `/*DO NOT EDIT THIS FILE; THIS FILE IS AUTO-GENERATED BY "sync-applications.js" IN THE TOOLCHAIN FOLDER*/import React from "react";import { Route, Routes } from "react-router";${apps
        .map((app) => `import Application${app} from "./apps/${app}/index";`)
        .toString()
        .replaceAll(
          ",",
          ""
        )}const ApplicationIndex: React.FC = () => {return <Routes>${apps
        .map(
          (app) => `<Route path={'${app}/*'} element={<Application${app}/>}/>`
        )
        .toString()
        .replaceAll(",", "")}</Routes>};export default ApplicationIndex`
    );
  } catch (e) {
    console.error(e);
  }
}

sync();
