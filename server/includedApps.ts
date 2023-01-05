import InstalledApplication from "../types/store/installedApplication.js"
import { returnBase64Image } from "./libServer.js"
import * as path from "path"

const includedApps: InstalledApplication[] = [
  {
    author: "Ewsgit",
    copyright: "MIT",
    description: "Test yourdash server endpoints",
    displayName: "Endpoint Tester",
    icon: returnBase64Image(path.resolve("./assets/apps/endpoint-tester.png")),
    moduleRequirements: [],
    name: "endpoint-tester",
    path: "/app/endpoint-tester",
    previewImages: [],
  },
  {
    author: "Ewsgit",
    copyright: "MIT",
    description: "The YourDash dashboard",
    displayName: "Dashboard",
    icon: returnBase64Image(path.resolve("./assets/apps/dash.png")),
    moduleRequirements: [],
    name: "dash",
    path: "/app/dash",
    previewImages: [],
  },
  {
    author: "Ewsgit",
    copyright: "MIT",
    description: "The YourDash file manager",
    displayName: "Files",
    icon: returnBase64Image(path.resolve("./assets/apps/files.png")),
    moduleRequirements: [],
    name: "files",
    path: "/app/files",
    previewImages: [],
  }, {
    author: "Ewsgit",
    copyright: "MIT",
    description: "The YourDash application and extension manager",
    displayName: "Store",
    icon: returnBase64Image(path.resolve("./assets/apps/store.png")),
    moduleRequirements: [],
    name: "store",
    path: "/app/store",
    previewImages: [],
  }, {
    author: "Ewsgit",
    copyright: "MIT",
    description: "The YourDash settings manager",
    displayName: "Settings",
    icon: returnBase64Image(path.resolve("./assets/apps/settings.png")),
    moduleRequirements: [],
    name: "settings",
    path: "/app/settings",
    previewImages: [],
  }, {
    author: "Ewsgit",
    copyright: "MIT",
    description: "The YourDash built-in mastodon client",
    displayName: "Mastodon Client",
    icon: returnBase64Image(path.resolve("./assets/apps/mastodon.png")),
    moduleRequirements: [],
    name: "mastodon",
    path: "/app/mastodon",
    previewImages: [],
  }, {
    author: "Ewsgit",
    copyright: "MIT",
    description: "The todo list / task organization application for YourDash",
    displayName: "Tasks",
    icon: returnBase64Image(path.resolve("./assets/apps/placeholder-icon.png")),
    moduleRequirements: [
      "tasks"
    ],
    name: "tasks",
    path: "/app/tasks",
    previewImages: [],
  }
]

export default includedApps

export const DEFAULT_APPS = [
  "dash", 
  "files",
  "store",
  "settings"
]