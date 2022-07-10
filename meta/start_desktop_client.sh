#!/bin/bash

npx kill-port 3000 3001 3002 3003 3004 3005
cd ./frontend/
npm run dev &
cd ./../desktop-client
npm run tauri dev