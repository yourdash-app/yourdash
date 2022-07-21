#!/bin/bash

cd ./frontend/
npx kill-port 3000 3001 3002 3003 3004 3005
npm run dev &
cd ./../desktop-client/tauri-remake/
npm run tauri dev