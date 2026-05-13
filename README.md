
Option 1 (recommended — run one by one)
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -

## then this

sudo apt install -y nodejs


nano .env

Paste your configuration into the .env file:

NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.90ywxcn.mongodb.net
//or
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.90ywxcn.mongodb.net/blogdb?retryWrites=true&w=majority

