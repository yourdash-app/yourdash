/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

export default defineConfig( {
  plugins: [
    react()
  ],
} )
