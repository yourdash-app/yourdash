#!/bin/bash
#
# Copyright ©2024 @Ewsgit and YourDash contributors.
# YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
#

curl -fsSL https://bun.sh/install | bash
# shellcheck disable=SC1090
source ~/.bashrc

cd / || exit

# does /yourdash exist?
if [ ! -d /yourdash ]; then
  sudo git clone https://github.com/yourdash/yourdash.git -b dev
  cd yourdash || exit
else
  cd yourdash || exit
  sudo git pull
fi

sudo bun install
sudo cp /yourdash/packages/backend/src/defaults/yourdash.service /etc/systemd/system/yourdash.service
sudo systemctl enable yourdash
sudo systemctl start yourdash
