#!/bin/bash
#
# Copyright ©2024 @Ewsgit and YourDash contributors.
# YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
#

source ./setupInstance.sh

echo "Running PM2 Setup"

echo "Installing pm2"
yarn global add pm2

echo "Reloading ~/.bashrc"
# shellcheck disable=SC1090
source /root/.bashrc

echo "Setting pm2 as a startup script"
pm2 startup

echo "Removing YourDash from pm2 (IGNORE IF AN ERROR OCCURS)"
pm2 delete yourdashBackend

echo "Adding YourDash Backend to pm2"
pm2 start /yourdash/toolchain/yourdashBackend.sh

echo "Removing YourDash Dev WebClient from pm2 (IGNORE IF AN ERROR OCCURS)"
pm2 delete yourdashDevWebClient

echo "Adding YourDash Dev WebClient to pm2"
pm2 start /yourdash/toolchain/yourdashDevWebClient.sh
