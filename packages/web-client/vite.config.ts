/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"
import dynamicImport from "vite-plugin-dynamic-import"
// enable for https testing. `import mkcert from "vite-plugin-mkcert"`

// ViteJS docs: https://vitejs.dev/config/
export default defineConfig( {
  plugins: [
    react(),
    dynamicImport()
    // enable for https tests. `mkcert()`
  ],
} )
