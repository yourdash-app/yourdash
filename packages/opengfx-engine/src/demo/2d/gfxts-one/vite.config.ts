/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { defineConfig } from "vite"
import dynamicImport from "vite-plugin-dynamic-import"

// ViteJS docs: https://vitejs.dev/config/
export default defineConfig( {
  plugins: [
    dynamicImport()
  ]
} )
