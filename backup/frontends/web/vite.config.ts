import react from "@vitejs/plugin-react-swc"
import * as path from "path"
import { defineConfig } from "vite"
import dynamicImport from "vite-plugin-dynamic-import"
/*enable for https testing. import mkcert from "vite-plugin-mkcert"*/

// ViteJS docs: https://vitejs.dev/config/
export default defineConfig( {
  resolve: {
    alias: {
      helpers: path.resolve( process.cwd(), "./src/helpers/" ),
      ui: path.resolve( process.cwd(), "./src/ui/" )
    }
  },
  plugins: [react(), dynamicImport()/*, enable for https tests. mkcert()*/]
} )
