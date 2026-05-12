
curl -fsSL [https://deb.nodesource.com/setup_22.x](https://deb.nodesource.com/setup_22.x) | sudo -E bash -
sudo apt install -y nodejs


nano .env

Paste your configuration into the .env file:

NODE_ENV=production
PORT=5000
MONGO_URI=

