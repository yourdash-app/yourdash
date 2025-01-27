npx tree-sitter-cli build-wasm ../../node_modules/tree-sitter-javascript
mv ../../tree-sitter-javascript.wasm ./core/editor/languages/javascript.wasm
echo "Completed Javascript"
npx tree-sitter-cli build-wasm ../../node_modules/tree-sitter-python
mv ../../tree-sitter-python.wasm ./core/editor/languages/python.wasm
echo "Completed Python"
npx tree-sitter-cli build-wasm ../../node_modules/tree-sitter-typescript/tsx
mv ../../tree-sitter-tsx.wasm ./core/editor/languages/tsx.wasm
echo "Completed TSX"
npx tree-sitter-cli build-wasm ../../node_modules/tree-sitter-typescript/typescript
mv ../../tree-sitter-typescript.wasm ./core/editor/languages/typescript.wasm
echo "Completed Typescript"
npx tree-sitter-cli build-wasm ../../node_modules/tree-sitter-json
mv ../../tree-sitter-json.wasm ./core/editor/languages/json.wasm
echo "Completed JSON"
npx tree-sitter-cli build-wasm ../../node_modules/tree-sitter-yaml
mv ../../tree-sitter-yaml.wasm ./core/editor/languages/yaml.wasm
echo "Completed YAML"
npx tree-sitter-cli build-wasm ../../node_modules/tree-sitter-html
mv ../../tree-sitter-html.wasm ./core/editor/languages/html.wasm
echo "Completed HTML"
npx tree-sitter-cli build-wasm ../../node_modules/tree-sitter-css
mv ../../tree-sitter-css.wasm ./core/editor/languages/css.wasm
echo "Completed CSS"
npx tree-sitter-cli build-wasm ../../node_modules/tree-sitter-scss
mv ../../tree-sitter-scss.wasm ./core/editor/languages/scss.wasm
echo "Completed SCSS"
