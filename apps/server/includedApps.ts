import { type InstalledApplication } from "types/store/installedApplication.js"

const includedApps: InstalledApplication[] = [
  {
    author: "Ewsgit",
    copyright: "MIT",
    description: "Test yourdash server endpoints",
    displayName: "Endpoints",
    icon: "endpoints.png",
    moduleRequirements: [],
    name: "endpoints",
    path: "/app/endpoints",
    previewImages: [],
  },
  {
    author: "Ewsgit",
    copyright: "MIT",
    description: "The YourDash dashboard",
    displayName: "Dashboard",
    icon: "dash.png",
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
    icon: "files.png",
    moduleRequirements: [
      "files"
    ],
    name: "files",
    path: "/app/files",
    previewImages: [],
  }, {
    author: "Ewsgit",
    copyright: "MIT",
    description: "The YourDash application and extension manager",
    displayName: "Store",
    icon: "store.png",
    moduleRequirements: [
      "store"
    ],
    name: "store",
    path: "/app/store",
    previewImages: [],
  }, {
    author: "Ewsgit",
    copyright: "MIT",
    description: "The YourDash settings manager",
    displayName: "Settings",
    icon: "settings.png",
    moduleRequirements: [],
    name: "settings",
    path: "/app/settings",
    previewImages: [],
  }, {
    author: "Ewsgit",
    copyright: "MIT",
    description: "The YourDash built-in mastodon client",
    displayName: "Mastodon",
    icon: "mastodon.png",
    moduleRequirements: [],
    name: "mastodon",
    path: "/app/mastodon",
    previewImages: [],
  }, {
    author: "Ewsgit",
    copyright: "MIT",
    description: "The todo list / task organization application for YourDash",
    displayName: "Tasks",
    icon: "placeholder-icon.png",
    moduleRequirements: [
      "tasks"
    ],
    name: "tasks",
    path: "/app/tasks",
    previewImages: [],
  }, {
    author: "Ewsgit",
    copyright: "MIT",
    description: "The YourDash code editor, edit files seamlessly with others.",
    displayName: "Code Studio",
    icon: "code-studio.png",
    moduleRequirements: [],
    name: "code-studio",
    path: "/app/code-studio",
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
