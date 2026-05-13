// # EC2 Deployment Guide (MERN Stack)

// This guide documents the steps taken to deploy this MERN stack application on an AWS EC2 instance running Ubuntu. It covers everything from connecting to the instance to keeping the backend running continuously using PM2.

// ## Prerequisites
// * An AWS EC2 Instance running **Ubuntu 22.04 LTS or 24.04 LTS**.
// * Security Group configured to allow inbound traffic on **Port 22 (SSH)** and **Port 5000 (Custom TCP)**.
// * Your `.pem` key pair downloaded to your local machine.

// ---

// ## Step 1: Connect to the EC2 Instance

// ssh -i "your-key.pem" ubuntu@<your-ec2-public-ip-or-dns>

// ## Step 2: Install Required Dependencies
// Important: Vite and its underlying bundlers require Node.js v20.19+ or v22+. We will install Node.js v22 to ensure the frontend builds correctly without CustomEvent or missing native binding errors.

// Update the system and install Node.js v22, Git, and PM2:

// # 1. Update package lists
// sudo apt update && sudo apt upgrade -y

// # 2. Download and install Node.js v22
// curl -fsSL [https://deb.nodesource.com/setup_22.x](https://deb.nodesource.com/setup_22.x) | sudo -E bash -
// sudo apt install -y nodejs

// # 3. Verify Node version (Should output v22.x.x)
// node -v

// # 4. Install Git
// sudo apt install -y git

// # 5. Install PM2 globally (Process Manager for Node.js)
// sudo npm install -g pm2

// ## Step 3: Clone the Repository

// git clone <your-github-repo-url>
// cd <your-repository-folder-name>

// ## Step 4: Build the Frontend

// # Navigate to the frontend directory
// cd frontend

// # Clean cache and install dependencies fresh (prevents OS binary conflicts)
// npm cache clean --force
// npm install

// # Build the project (generates the /dist folder)
// npm run build

// ## Step 5: Configure the Backend
// # Navigate back to the root, then into the backend
// cd ../backend

// # Install backend dependencies
// npm install

// # Create the environment variables file
// nano .env

// Paste your configuration into the .env file:

// NODE_ENV=production
// PORT=5000
// MONGO_URI=

// ## Step 6: Start the Server with PM2
// # Start the server
// pm2 start server.js --name "ecommerce-app"

// # Configure PM2 to auto-restart the app if the EC2 instance reboots
// pm2 startup ubuntu

// (Run the specific command PM2 outputs to your console, it will look something like sudo env PATH=$PATH:/usr/bin...)

// Bash
// # Save the current PM2 process list
// pm2 save


// location /api/ {
//     proxy_pass http://127.0.0.1:5000/;
//     proxy_http_version 1.1;
//     proxy_set_header Upgrade $http_upgrade;
//     proxy_set_header Connection 'upgrade';
//     proxy_set_header Host $host;
//     proxy_cache_bypass $http_upgrade;
// }

// 🚀 FULL NGINX SETUP (MERN + /api routing)

// We assume:

// Backend running on PM2 → port 5000
// Frontend built using Vite → dist/
// API prefix = /api
// ✅ STEP 1: Install / verify NGINX
// sudo apt update
// sudo apt install nginx -y

// Check:

// sudo systemctl status nginx
// ✅ STEP 2: Build frontend (you already did but for reference)
// cd frontend
// npm install
// npm run build

// This creates:

// frontend/dist
// ✅ STEP 3: Copy frontend to NGINX folder
// sudo rm -rf /var/www/html/*
// sudo cp -r dist/ /var/www/html/



// ✅ STEP 4: Open NGINX config
// sudo nano /etc/nginx/sites-available/default
// ✅ STEP 5: REPLACE ENTIRE SERVER BLOCK with this

// 👉 This is your COMPLETE correct setup:

// server {
//     listen 80;
//     server_name _;

//     root /var/www/html/dist;

//     # FRONTEND (React/Vite SPA routing fix)
//     location / {
//         try_files $uri $uri/ index.html;
//     }

//     # BACKEND API ROUTING
//     location /api/ {
//         proxy_pass http://127.0.0.1:5000/;
//         proxy_http_version 1.1;

//         proxy_set_header Upgrade $http_upgrade;
//         proxy_set_header Connection 'upgrade';
//         proxy_set_header Host $host;
//         proxy_cache_bypass $http_upgrade;
//     }
// }
// 🧠 IMPORTANT NOTES
// 1. try_files ... /index.html

// This fixes:

// React routing (SPA refresh issue)
// prevents 404 on page reload
// 2. /api/ proxy_pass MUST have trailing slash
// proxy_pass http://127.0.0.1:5000/;

// ✔ This removes /api prefix correctly

// ✅ STEP 6: Test NGINX config
// sudo nginx -t

// You should see:

// syntax is ok
// test is successful
// ✅ STEP 7: Restart NGINX
// sudo systemctl restart nginx

// note in root no need /dist if in case something fails
// and in =404 replace with /index.html if index.html does not work