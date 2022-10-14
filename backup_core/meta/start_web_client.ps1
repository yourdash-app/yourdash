npx kill-port 3000 3001 3002 3003 3004 3005
Set-Location ./src/frontend/
npx open-cli "http://localhost:3000" &
npm run dev
Set-Location ./../