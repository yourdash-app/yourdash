#!/bin/bash
#
# Copyright ©2024 @Ewsgit and YourDash contributors.
# YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
#

echo "Installing YourDash and dependencies"

echo "Updating system packages"
sudo apt update -y && sudo apt upgrade -y

echo "Installing NodeJS"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

echo "Reloading ~/.bashrc"
# shellcheck disable=SC1090
source ~/.bashrc

echo "Installing LTS NodeJS"
nvm install 21
nvm alias default 21

echo "Re-sourcing ~/.bashrc"
# shellcheck disable=SC1090
source ~/.bashrc

cd / || exit

# does /yourdash exist?
if [ ! -d /yourdash ]; then
  echo "Cloning YourDash"
  sudo git clone https://github.com/yourdash/yourdash.git -b dev
  cd yourdash || exit
else
  echo "Updating YourDash"
  cd yourdash || exit
  sudo git stash
  sudo git pull
fi

echo "Adding YourDash as a safe directory for git"
sudo git config --global --add safe.directory /yourdash

echo "Setting YourDash (\"/yourdash\") permissions"
sudo chmod 777 -R /yourdash

echo "Installing YourDash dependencies"
npm i -g yarn

echo "if yarn install fails, run this script again"
yarn install

echo "Installing YourDash systemd service"
sudo cp /yourdash/packages/backend/src/defaults/yourdash.service /etc/systemd/system/yourdash.service

echo "Enabling YourDash systemd service"
sudo systemctl enable yourdash

echo "Starting YourDash systemd service"
sudo systemctl start yourdash
