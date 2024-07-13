#!/bin/bash
#
# Copyright ©2024 @Ewsgit and YourDash contributors.
# YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
#

if [ "$EUID" -ne 0 ]; then
  echo "Please run as root"
  exit
fi

echo "Installing YourDash and dependencies"

echo "Updating system packages"
apt update -y && apt upgrade -y

echo "Installing NodeJS"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

echo "Reloading ~/.bashrc"
# shellcheck disable=SC1090
source ~/.bashrc

echo "Installing LTS NodeJS"
nvm install 21
nvm alias default 21
nvm use 21

echo "Re-sourcing ~/.bashrc"
# shellcheck disable=SC1090
source ~/.bashrc

echo "Installing Bun"
curl -fsSL https://bun.sh/install | bash

echo "Re-sourcing ~/.bashrc"
# shellcheck disable=SC1090
source ~/.bashrc

cd / || exit

# does /yourdash exist?
if [ ! -d /yourdash ]; then
  echo "Cloning YourDash"
  git clone https://github.com/yourdash/yourdash.git -b dev
  cd yourdash || exit
else
  echo "Updating YourDash"
  cd yourdash || exit
  git stash
  git pull
fi

echo "Adding YourDash as a safe directory for git"
git config --global --add safe.directory /yourdash

echo "Setting YourDash (\"/yourdash\") permissions"
chmod 777 -R /yourdash

echo "Installing YourDash dependencies"
npm i -g yarn

echo "IMPORTANT!: if yarn install fails, run this script again"
yarn install

echo "YourDash has been installed along with it's dependencies!"
