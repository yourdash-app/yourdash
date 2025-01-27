#!/bin/bash
#
# Copyright ©2024 @Ewsgit and YourDash contributors.
# YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
#

if ! [ "$(id -u)" = 0 ]; then
   echo "Please run the script as root to continue." >&2
   exit 1
fi

if [ "$SUDO_USER" ]; then
    real_user=$SUDO_USER
else
    real_user=$(whoami)
fi

printf "\nHiya, ..%s.. !\n" "$real_user"

echo "Installing YourDash and dependencies"

echo "Updating system packages"
apt update -y && apt upgrade -y

echo "Installing NodeJS"
sudo -u "$real_user" curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

echo "Reloading ~/.bashrc"
# shellcheck disable=SC1090
source ~/.bashrc

echo "Installing NodeJS v22.xx"
sudo -u "$real_user" nvm install 22
sudo -u "$real_user" nvm alias default 22
sudo -u "$real_user" nvm use 22

echo "Re-sourcing ~/.bashrc"
# shellcheck disable=SC1090
source ~/.bashrc

echo "Installing Bun"
sudo -u "$real_user" curl -fsSL https://bun.sh/install | bash

echo "Re-sourcing ~/.bashrc"
# shellcheck disable=SC1090
source ~/.bashrc

cd / || exit

# does /yourdash exist?
if [ ! -d /yourdash ]; then
  echo "Cloning YourDash"
  git clone https://github.com/yourdash/yourdash.git -b dev --recurse
  cd yourdash || exit
else
  echo "Updating YourDash"
  cd yourdash || exit
  git stash
  git pull --recurse
fi

echo "Adding YourDash as a safe directory for git"
git config --global --add safe.directory /yourdash

echo "Setting YourDash (\"/yourdash\") permissions"
chmod 777 -R /yourdash

echo "Installing YourDash dependencies"
sudo -u "$real_user" npm i -g yarn

echo "IMPORTANT!: if yarn install fails, run this script again"
sudo -u "$real_user" yarn install

echo "YourDash has been installed along with it's dependencies!"
