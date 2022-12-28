import InstalledApplication from "../types/store/installedApplication.js"
import { returnBase64Image } from "./libServer.js"
import * as path from "path"

const includedApps: InstalledApplication[] = [
  {
    name: "endpoint-tester",
    displayName: "Endpoint Tester",
    description: "Test yourdash server endpoints",
    icon: returnBase64Image(path.resolve("./assets/apps/endpoint-tester.png")),
    author: "Ewsgit",
    copyright: "MIT",
    moduleRequirements: [],
    previewImages: [],
    path: "/app/endpoint-tester"
  },
  {
    name: "dash",
    displayName: "Dashboard",
    description: "The YourDash dashboard",
    icon: returnBase64Image(path.resolve("./assets/apps/dash.png")),
    author: "Ewsgit",
    copyright: "MIT",
    moduleRequirements: [],
    previewImages: [],
    path: "/app/dash"
  },
  {
    name: "files",
    displayName: "Files",
    description: "The YourDash file manager",
    icon: returnBase64Image(path.resolve("./assets/apps/files.png")),
    author: "Ewsgit",
    copyright: "MIT",
    moduleRequirements: [],
    previewImages: [],
    path: "/app/files"
  }, {
    name: "store",
    displayName: "Store",
    description: "The YourDash application and extension manager",
    icon: returnBase64Image(path.resolve("./assets/apps/store.png")),
    author: "Ewsgit",
    copyright: "MIT",
    moduleRequirements: [],
    previewImages: [],
    path: "/app/store"
  }, {
    name: "settings",
    displayName: "Settings",
    description: "The YourDash settings manager",
    icon: returnBase64Image(path.resolve("./assets/apps/settings.png")),
    author: "Ewsgit",
    copyright: "MIT",
    moduleRequirements: [],
    previewImages: [],
    path: "/app/settings"
  }, {
    name: "mastodon",
    displayName: "Mastodon Client",
    description: "The YourDash built-in mastodon client",
    icon: returnBase64Image(path.resolve("./assets/apps/mastodon.png")),
    author: "Ewsgit",
    copyright: "MIT",
    moduleRequirements: [],
    previewImages: [],
    path: "/app/mastodon"
  }
]

export default includedApps