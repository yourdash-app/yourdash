/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { electronApp, is } from "@electron-toolkit/utils";
import { app, BrowserWindow, ipcMain, Menu, MenuItem, shell } from "electron";
import { join } from "path";
import APPLICATION_ICON from "./resources/icon.png?asset";

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow( {
    width: 1024,
    height: 768,
    show: true,
    icon: APPLICATION_ICON,
    autoHideMenuBar: !is.dev,
    webPreferences: {
      preload: join( __dirname, "../preload/index.js" ),
      sandbox: false,
      webviewTag: true
    }
  } );

  if ( is.dev ) {
  // Set the custom menubar for the window
    const mainWindowMenuBar = new Menu()
    mainWindowMenuBar.append( new MenuItem( {
      label: "Developer",
      submenu: [
        {
          role: "reload",
          accelerator: process.platform === "darwin" ? "Alt+Cmd+I" : "F5"
        },
        {
          role: "forceReload",
          accelerator: process.platform === "darwin" ? "Alt+Cmd+I" : "Ctrl+F5"
        },
        {
          role: "toggleDevTools",
          accelerator: process.platform === "darwin" ? "Alt+Cmd+I" : "Ctrl+Shift+I"
        }
      ]
    } ) )

    mainWindow.setMenu( mainWindowMenuBar )
  } else {
    mainWindow.removeMenu()
  }

  mainWindow.on( "ready-to-show", () => {
    mainWindow.show();
  } );

  mainWindow.webContents.setWindowOpenHandler( ( details ) => {
    shell.openExternal( details.url ).then( () => 0 )
    return { action: "deny" };
  } );

  if ( is.dev && process.env[ "ELECTRON_RENDERER_URL" ] ) {
    // Load the internal vite server if in development mode
    // mainWindow.loadURL(process.env[ "ELECTRON_RENDERER_URL" ]);
    mainWindow.loadURL( "http://localhost:5173/#/linker-desktop-client-startup" ).then( () => 0 );
  } else {
    // Load the local web-client when running the app in production
    // mainWindow.loadFile( join( __dirname, "../renderer/index.html" ) );

    // TODO: replace with a local build of the web-client in the future
    mainWindow.loadURL( "https://ydsh.pages.dev/#/linker-desktop-client-startup" ).then( () => 0 );
  }

  ipcMain.on( "core-log-renderer-startup", ( _event, msg ) => {
    console.log( msg );
  } );

  ipcMain.on( "core:control:zoom", ( _event, scale ) => {
    console.log( scale );
    mainWindow.webContents.setZoomFactor( scale );
  } );
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then( () => {
  // Set app user model id for windows
  electronApp.setAppUserModelId( "io.github.yourdash-app.desktop" );

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  app.on( "browser-window-created", ( _, window ) => { // eslint-disable-line @typescript-eslint/no-unused-vars
    // do nothing yet
  } );

  createWindow();

  // Only for Darwin
  app.on( "activate", function() {
    if ( BrowserWindow.getAllWindows().length === 0 ) {
      createWindow();
    }
  } );
} );

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on( "window-all-closed", () => {
  if ( process.platform !== "darwin" ) {
    app.quit();
  }
} );
