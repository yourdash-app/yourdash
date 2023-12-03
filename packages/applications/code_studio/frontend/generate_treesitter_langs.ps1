npx tree-sitter-cli build-wasm ..\..\node_modules\tree-sitter-javascript
Move-Item ../../tree-sitter-javascript.wasm ./core/editor/languages/javascript.wasm
Write-Host "Completed Javascript"
npx tree-sitter-cli build-wasm ..\..\node_modules\tree-sitter-python
Move-Item ../../tree-sitter-python.wasm ./core/editor/languages/python.wasm
Write-Host "Completed Python"
npx tree-sitter-cli build-wasm ..\..\node_modules\tree-sitter-typescript\tsx
Move-Item ../../tree-sitter-tsx.wasm ./core/editor/languages/tsx.wasm
Write-Host "Completed TSX"
npx tree-sitter-cli build-wasm ..\..\node_modules\tree-sitter-typescript\typescript
Move-Item ../../tree-sitter-typescript.wasm ./core/editor/languages/typescript.wasm
Write-Host "Completed Typescript"
npx tree-sitter-cli build-wasm ..\..\node_modules\tree-sitter-json
Move-Item ../../tree-sitter-json.wasm ./core/editor/languages/json.wasm
Write-Host "Completed JSON"
npx tree-sitter-cli build-wasm ..\..\node_modules\tree-sitter-yaml
Move-Item ../../tree-sitter-yaml.wasm ./core/editor/languages/yaml.wasm
Write-Host "Completed YAML"
npx tree-sitter-cli build-wasm ..\..\node_modules\tree-sitter-html
Move-Item ../../tree-sitter-html.wasm ./core/editor/languages/html.wasm
Write-Host "Completed HTML"
npx tree-sitter-cli build-wasm ..\..\node_modules\tree-sitter-markdown
Move-Item ../../tree-sitter-markdown.wasm ./core/editor/languages/markdown.wasm
Write-Host "Completed Markdown"
npx tree-sitter-cli build-wasm ..\..\node_modules\tree-sitter-css
Move-Item ../../tree-sitter-css.wasm ./core/editor/languages/css.wasm
Write-Host "Completed CSS"
npx tree-sitter-cli build-wasm ..\..\node_modules\tree-sitter-scss
Move-Item ../../tree-sitter-scss.wasm ./core/editor/languages/scss.wasm
Write-Host "Completed SCSS"
