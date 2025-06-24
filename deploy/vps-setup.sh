#!/bin/bash

# VPS Setup Script for Synth MCP Server
# Run this on your VPS (Ubuntu/Debian)

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx

# Clone your repository
cd /var/www
sudo git clone https://github.com/yourusername/synth-mcp-server.git
cd synth-mcp-server

# Install dependencies and build
sudo npm install
sudo npm run build

# Create environment file
sudo tee .env > /dev/null <<EOF
SYNTH_API_KEY=your_synth_api_key_here
PORT=3000
NODE_ENV=production
EOF

# Start with PM2
sudo pm2 start dist/server.js --name synth-mcp
sudo pm2 startup systemd
sudo pm2 save

# Configure Nginx
sudo tee /etc/nginx/sites-available/synth-mcp > /dev/null <<'EOF'
server {
    listen 80;
    server_name mcp.synthfinance.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # SSE specific settings
        proxy_set_header Cache-Control no-cache;
        proxy_buffering off;
        proxy_read_timeout 86400;
    }
    
    location /health {
        proxy_pass http://localhost:3000/health;
    }
}
EOF

# Enable the site
sudo ln -s /etc/nginx/sites-available/synth-mcp /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

echo "Server setup complete! Now configure Cloudflare DNS and SSL."