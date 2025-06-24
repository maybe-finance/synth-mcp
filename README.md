# Synth MCP

A remote MCP (Model Context Protocol) server that provides AI assistants with access to the Synth Finance API. This server enables Claude Desktop and other MCP-compatible clients to access financial data, currency information, stock prices, insider trading data, and more through natural language queries.

## Features

- **🏦 Transaction Enrichment**: Decode cryptic bank transactions into clear merchant information with logos, locations, and categories
- **💱 Currency Exchange Rates**: Access real-time and historical exchange rates for all major currencies
- **📈 Stock Market Data**: Search tickers and retrieve historical OHLC price data
- **👔 Insider Trading Data**: Access comprehensive SEC Form 4 filings and executive trading activity
- **👤 User Account Info**: Check API usage, credits remaining, and account details

## Quick Start

### For Users

Simply add this to your Claude Desktop configuration:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "synth": {
      "url": "https://mcp.synthfinance.com/sse",
      "transport": "sse",
      "headers": {
        "Authorization": "Bearer YOUR_SYNTH_API_KEY"
      }
    }
  }
}
```

Get your API key at [synthfinance.com](https://synthfinance.com).

## Available Tools

### 💳 `enrichTransaction`
Decode cryptic bank and credit card transactions into meaningful merchant information.

**Example queries:**
- "What is this charge: SQ *COFFEE SHOP 4155551234"
- "Decode TST* MERCHANT NAME 123"
- "Identify this transaction: WM SUPERCENTER #1234"

### 💵 `getLiveRates`
Get real-time currency exchange rates (updated every 60 seconds).

**Example queries:**
- "What's the current USD to EUR exchange rate?"
- "Convert 100 dollars to euros"
- "Get live forex rates for major currencies"

### 📊 `getHistoricalRates`
Get historical exchange rates for any past date.

**Example queries:**
- "What was the USD to EUR rate on January 1, 2023?"
- "Get exchange rates from last month"
- "Historical EUR/USD rate for tax purposes"

### 🔍 `searchTickers`
Search for stock tickers by company name or symbol.

**Example queries:**
- "Find ticker for Apple"
- "What's the stock symbol for Microsoft?"
- "Search for renewable energy stocks"

### 📈 `getOpenClosePrices`
Get historical stock price data (OHLC) for any date range.

**Example queries:**
- "Get AAPL stock prices for January 2024"
- "Show me Tesla's price history for last quarter"
- "OHLC data for NVDA from 2023"

### 👔 `getInsiderTrades`
Access insider trading activity and SEC Form 4 filings.

**Example queries:**
- "Show insider trades for AAPL"
- "Recent insider activity for Tesla"
- "Which executives are buying MSFT?"

### 👤 `getUserInfo`
Get your Synth account information and API usage.

**Example queries:**
- "Show my account information"
- "How many API credits do I have left?"
- "Check my API usage"

## Enhanced Tool Discovery

This MCP server includes extensive keyword optimization to ensure tools are triggered appropriately. Each tool responds to hundreds of related terms and natural language patterns, making it more likely that your queries will use the Synth API rather than web search.

## Self-Hosting

### Deploy to Railway (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/synth-mcp.git
   git push -u origin main
   ```

2. **Deploy on Railway:**
   - Go to [railway.app](https://railway.app)
   - Click "New Project" → "Deploy from GitHub"
   - Select your repository
   - Railway automatically deploys!

3. **Add Custom Domain:**
   - In Railway: Settings → Networking → Add your domain
   - In your DNS: Add CNAME record pointing to Railway

### Deploy with Docker

```bash
docker build -t synth-mcp .
docker run -p 3000:3000 synth-mcp
```

### Deploy to Heroku

```bash
heroku create your-synth-mcp
git push heroku main
```

## API Endpoints

- `GET /health` - Health check endpoint
- `GET /sse` - SSE endpoint for MCP communication
- `POST /message` - Message handling endpoint

## Security

- API keys are passed through headers and never stored on the server
- Each user provides their own Synth API key
- Always use HTTPS in production
- CORS is configured for secure cross-origin access

## Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

- `PORT` - Server port (default: 3000, automatically set by most hosting platforms)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

## Support

- **Synth API Documentation**: [docs.synthfinance.com](https://docs.synthfinance.com)
- **Get API Key**: [synthfinance.com](https://synthfinance.com)
- **MCP Documentation**: [modelcontextprotocol.io](https://modelcontextprotocol.io)

---

Built with ❤️ by [Synth Finance](https://synthfinance.com)