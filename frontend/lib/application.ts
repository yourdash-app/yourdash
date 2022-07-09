interface Application {
  string_id: string; // dev.dash.store
  name: string; // "devdash store"
  version: string; // "0.0.1" (npm version)
  description: string; // "view, install and manage your apps in devdash"
  icon: string; // the icon in base64 format
  tags: string[]; // "application-store", "system-default"
  authors: string[]; // ["ewsgit"]
  license: string; // MIT, Apache-2.0, etc.
  repository: string; // https://github.com/devdash/store (git repository in this case is github)
  homepage: string; // https://devdash.io/store (homepage in this case is hosted on github pages)
  security_type: "unknown" | "safe" | "unsafe"; // manually checked security level
}

export default Application;
