#
# Copyright © 2022 Ewsgit
# All rights reserved.
# Licensed under the MIT License - https://ewsgit.github.io/devdash/copyright
#

Write-Output "#####################################"
Write-Output "  DevDash | Installing dependencies  "
Write-Output "#####################################"

Write-Output "#####################################"
Write-Output "          Installing  Tauri          "
Write-Output "#####################################"

Write-Output " "
Write-Output "[WARNING] Rustup can't be installed automatically navigate to https://rustup.rs and install Rust."
Write-Output " "
Write-Output "[WARNING] NodeJs can't be installed automatically navigate to https://nodejs.org and install NodeJs."
Write-Output " "

Set-Location ./src

Set-Location ./frontend/

npm i

Set-Location ../desktop_client/

npm i

Set-Location ./tauri-remake/

npm i

Set-Location ../../backend/personal/

npm i

Set-Location ../../../

Write-Output "#####################################"
Write-Output "               Done :D               "
Write-Output "#####################################"