#!/bin/bash
sudo apt update

curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
apt-cache policy docker-ce
sudo apt install docker-ce

mkdir -p ~/.docker/cli-plugins/
curl -SL https://github.com/docker/compose/releases/download/v2.14.2/docker-compose-linux-x86_64 -o ~/.docker/cli-plugins/docker-compose
chmod +x ~/.docker/cli-plugins/docker-compose

sudo apt install -y certbot python3-certbot-nginx

sudo certbot certonly --standalone -d  andrey-novaes.store -d www.andrey-novaes.store --agree-tos --email your-email@example.com --non-interactive -v

sed -i 's|/path/to/fullchain.pem|/etc/letsencrypt/live/andrey-novaes.store/fullchain.pem|' docker-compose.yml
sed -i 's|/path/to/privkey.pem|/etc/letsencrypt/live/andrey-novaes.store/privkey.pem|' docker-compose.yml

# docker compose up
