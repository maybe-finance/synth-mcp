# Deploying to Railway with Custom Domain

## Step 1: Prepare Your Repository

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/synth-mcp.git
git push -u origin main
```

## Step 2: Deploy to Railway

1. **Go to [Railway.app](https://railway.app)**
2. Click "Start a New Project"
3. Choose "Deploy from GitHub repo"
4. Connect your GitHub account and select your `synth-mcp` repository
5. Railway will automatically detect the Node.js app and start deploying

## Step 3: Configure Environment Variables

Railway automatically sets the `PORT` environment variable for you. No other configuration needed!

## Step 4: Set Up Custom Domain

1. In Railway dashboard, go to "Settings" → "Networking"
2. Click "Generate Domain" first (to ensure the app is accessible)
3. Then click "Add Custom Domain"
4. Enter `mcp.synthfinance.com`
5. Railway will show you a CNAME record to add

## Step 5: Configure DNS in Cloudflare

1. **Log into Cloudflare** and select the `synthfinance.com` domain
2. Go to "DNS" settings
3. Add a new record:
   - **Type**: CNAME
   - **Name**: `mcp`
   - **Target**: The Railway domain (something like `your-app.up.railway.app`)
   - **Proxy status**: Proxied (orange cloud ON)
   - **TTL**: Auto

4. **Important SSL/TLS Settings** in Cloudflare:
   - Go to "SSL/TLS" → "Overview"
   - Set encryption mode to "Full" (not "Full (strict)")
   - This prevents redirect loops with Railway

## Step 6: Users Connect to Your Server

Once deployed and DNS is propagated (usually within minutes), users can add to their Claude Desktop config:

```json
{
  "mcpServers": {
    "synth": {
      "url": "https://mcp.synthfinance.com/sse",
      "transport": "sse",
      "headers": {
        "Authorization": "Bearer THEIR_SYNTH_API_KEY"
      }
    }
  }
}
```

Each user needs their own Synth API key from [synthfinance.com](https://synthfinance.com).

## Monitoring Your Deployment

1. **Railway Dashboard**: Shows logs, metrics, and deployment status
2. **Health Check**: Visit `https://mcp.synthfinance.com/health`
3. **Cloudflare Analytics**: Shows traffic and performance metrics

## Updating Your Server

To deploy updates:

```bash
git add .
git commit -m "Update description"
git push origin main
```

Railway automatically redeploys when you push to GitHub.

## Costs

- **Railway**: Free tier includes 500 hours/month, then ~$5/month for a small server
- **Cloudflare**: Free for DNS and basic features

## Troubleshooting

1. **502 Bad Gateway**: Wait a few minutes for Railway to fully deploy
2. **SSL Errors**: Ensure Cloudflare SSL mode is set to "Full" (not "Full (strict)")
3. **Connection Issues**: Check Railway logs in the dashboard
4. **Tool Not Found**: Restart Claude Desktop after config changes

## Alternative: Quick Deploy Button

Add this to your GitHub README for one-click deploys:

```markdown
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/synth-mcp)
```

This allows others to deploy their own instance with one click!