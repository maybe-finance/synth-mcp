#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import express from "express";
import cors from "cors";
import crypto from "crypto";
import dotenv from "dotenv";
import { SynthClient } from "./synth-client.js";
import * as tools from "./tools/index.js";
import { tokenStore } from "./token-store.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Token storage is now handled by tokenStore

// Enable CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'synth-mcp' });
});

// Root page - Instructions
app.get('/', (req, res) => {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Synth MCP Server</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      background: #f5f5f5;
    }
    .container {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    h1 {
      color: #333;
      margin-bottom: 0.5rem;
    }
    .subtitle {
      color: #666;
      margin-bottom: 2rem;
    }
    .section {
      margin-bottom: 2rem;
    }
    .section h2 {
      color: #007bff;
      margin-bottom: 1rem;
    }
    .code-block {
      background: #f8f9fa;
      border: 1px solid #e9ecef;
      border-radius: 4px;
      padding: 1rem;
      font-family: monospace;
      font-size: 0.875rem;
      overflow-x: auto;
    }
    .step {
      margin-bottom: 1rem;
      padding-left: 1.5rem;
    }
    .step-number {
      display: inline-block;
      background: #007bff;
      color: white;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      text-align: center;
      line-height: 24px;
      margin-left: -1.5rem;
      margin-right: 0.5rem;
      font-size: 0.875rem;
    }
    a {
      color: #007bff;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    .warning {
      background: #fff3cd;
      border: 1px solid #ffeaa7;
      color: #856404;
      padding: 1rem;
      border-radius: 4px;
      margin-bottom: 1rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Synth MCP Server</h1>
    <p class="subtitle">Connect Claude to your Synth Finance data</p>
    
    <div class="section">
      <h2>Quick Start</h2>
      <div class="warning">
        Looking to quickly connect? <a href="/connect">Generate your connection token here</a>
      </div>
    </div>

    <div class="section">
      <h2>Method 1: Local Installation (Recommended)</h2>
      <p>Run the MCP server locally with your API key:</p>
      
      <div class="step">
        <span class="step-number">1</span>
        Install the server globally:
      </div>
      <div class="code-block">npm install -g synth-mcp</div>
      
      <div class="step">
        <span class="step-number">2</span>
        Add to Claude Desktop config:
      </div>
      <div class="code-block">{
  "mcpServers": {
    "synth": {
      "command": "synth-mcp",
      "env": {
        "SYNTH_API_KEY": "your-api-key-here"
      }
    }
  }
}</div>
      
      <div class="step">
        <span class="step-number">3</span>
        Restart Claude Desktop
      </div>
    </div>

    <div class="section">
      <h2>Method 2: Remote Connection</h2>
      <p>Connect to our hosted server:</p>
      
      <div class="step">
        <span class="step-number">1</span>
        <a href="/connect">Generate a connection token</a> with your Synth API key
      </div>
      
      <div class="step">
        <span class="step-number">2</span>
        Use the provided URL in Claude Desktop or Claude.ai
      </div>
    </div>

    <div class="section">
      <h2>Available Tools</h2>
      <ul>
        <li><strong>enrichTransaction</strong> - Analyze and categorize transactions</li>
        <li><strong>getLiveRates</strong> - Get current exchange rates</li>
        <li><strong>getHistoricalRates</strong> - Get historical exchange rates</li>
        <li><strong>searchTickers</strong> - Search for stock tickers</li>
        <li><strong>getOpenClosePrices</strong> - Get stock price history</li>
        <li><strong>getUserInfo</strong> - Get your Synth account info</li>
        <li><strong>getInsiderTrades</strong> - Get insider trading data</li>
      </ul>
    </div>

    <div class="section">
      <h2>Need Help?</h2>
      <p>Visit <a href="https://docs.synthfinance.com">docs.synthfinance.com</a> for more information.</p>
    </div>
  </div>
</body>
</html>
  `;
  res.send(html);
});

// Connect page - Generate token
app.get('/connect', (req, res) => {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Connect Synth MCP</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      background: #f5f5f5;
    }
    .container {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      max-width: 500px;
      width: 100%;
    }
    h1 {
      margin: 0 0 1.5rem 0;
      font-size: 1.5rem;
      text-align: center;
    }
    .form-group {
      margin-bottom: 1rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      box-sizing: border-box;
    }
    button {
      width: 100%;
      padding: 0.75rem;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      font-weight: 500;
    }
    button:hover {
      background: #0056b3;
    }
    .success {
      display: none;
      background: #d4edda;
      color: #155724;
      padding: 1rem;
      border-radius: 4px;
      margin-top: 1rem;
    }
    .url-display {
      background: #f8f9fa;
      padding: 1rem;
      border-radius: 4px;
      font-family: monospace;
      word-break: break-all;
      margin: 1rem 0;
      border: 1px solid #dee2e6;
      cursor: pointer;
      position: relative;
    }
    .url-display:hover {
      background: #e9ecef;
    }
    .copy-hint {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      font-size: 0.75rem;
      color: #666;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    .info {
      background: #e7f3ff;
      padding: 0.75rem;
      border-radius: 4px;
      margin-bottom: 1rem;
      font-size: 0.875rem;
      color: #004080;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Connect Synth to Claude</h1>
    <div class="info">
      Generate a secure token to connect Claude to your Synth account.
    </div>
    <form id="connectForm">
      <div class="form-group">
        <label for="apiKey">Your Synth API Key</label>
        <input 
          type="password" 
          id="apiKey" 
          name="apiKey" 
          placeholder="Enter your Synth API key"
          required
        />
      </div>
      <button type="submit">Generate Connection URL</button>
    </form>
    <div id="success" class="success">
      <h2 style="margin: 0 0 1rem 0; font-size: 1.25rem;">Connection URL Generated!</h2>
      <p style="margin-bottom: 0.5rem;">Use this URL in Claude:</p>
      <div id="urlDisplay" class="url-display">
        <span class="copy-hint">Click to copy</span>
        <span id="urlText"></span>
      </div>
      <p style="margin-top: 1rem; font-size: 0.875rem;">
        For Claude Desktop: Add this URL as an MCP server<br>
        For Claude.ai: Go to Settings → Integrations → Add this URL
      </p>
    </div>
  </div>
  <script>
    document.getElementById('connectForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const apiKey = document.getElementById('apiKey').value;
      
      try {
        const response = await fetch('/api/tokens', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ apiKey })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          const url = window.location.origin + '/sse?token=' + data.token;
          document.getElementById('urlText').textContent = url;
          document.getElementById('success').style.display = 'block';
          
          // Copy on click
          document.getElementById('urlDisplay').addEventListener('click', () => {
            navigator.clipboard.writeText(url).then(() => {
              const hint = document.querySelector('.copy-hint');
              hint.textContent = 'Copied!';
              setTimeout(() => {
                hint.textContent = 'Click to copy';
              }, 2000);
            });
          });
        } else {
          alert(data.error || 'Failed to generate token');
        }
      } catch (error) {
        alert('Connection error. Please try again.');
      }
    });
  </script>
</body>
</html>
  `;
  res.send(html);
});

// API endpoint to create tokens
app.post('/api/tokens', async (req, res) => {
  const { apiKey } = req.body;
  
  if (!apiKey) {
    return res.status(400).json({ error: 'API key is required' });
  }
  
  try {
    // Validate API key
    const synthClient = new SynthClient(apiKey);
    await synthClient.getUser();
    
    // Generate token
    const token = crypto.randomBytes(32).toString('hex');
    
    // Store token persistently
    tokenStore.set(token, apiKey);
    
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: 'Invalid API key' });
  }
});

// SSE endpoint - accepts token in query param or Bearer token
app.get('/sse', async (req, res) => {
  console.log('SSE endpoint accessed');
  console.log('Query params:', req.query);
  console.log('Authorization header:', req.headers.authorization);
  
  let token: string | undefined;
  let apiKey: string | undefined;
  
  // Check query parameter first (for Claude Desktop)
  if (req.query.token) {
    token = req.query.token as string;
    console.log(`Looking up token: ${token}`);
    console.log(`Tokens in storage: ${tokenStore.size()}`);
    const tokenData = tokenStore.get(token);
    if (tokenData) {
      console.log('Token found in storage');
      apiKey = tokenData.synthApiKey;
    } else {
      console.log('Token not found in storage');
    }
  }
  
  // Check Bearer token (for future OAuth support)
  if (!apiKey && req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.substring(7);
    const tokenData = tokenStore.get(token);
    if (tokenData) {
      apiKey = tokenData.synthApiKey;
    }
  }
  
  // Check environment variable (for local dev)
  if (!apiKey && process.env.SYNTH_API_KEY) {
    apiKey = process.env.SYNTH_API_KEY;
  }
  
  // TEMPORARY: Hardcoded token for testing
  // Remove this once persistent storage is working
  if (!apiKey && token === 'd8cf22277fdd61109009512e38103bc8dcf3314afa5d49faf2fda0ab88c48444') {
    console.log('Using temporary hardcoded token');
    apiKey = process.env.SYNTH_TEMP_API_KEY || process.env.SYNTH_API_KEY;
  }
  
  if (!apiKey) {
    console.error('No API key found for request');
    return res.status(401).json({
      error: 'Authentication required',
      message: 'Please provide a valid token or visit /connect to generate one'
    });
  }
  
  console.log('API key found, initializing MCP server');
  
  // Create MCP server
  // Note: SSEServerTransport expects the path where messages will be POSTed
  const transport = new SSEServerTransport('/message', res);
  const synthClient = new SynthClient(apiKey);
  
  const server = new Server(
    {
      name: "synth-mcp",
      version: "1.0.0",
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => {
    console.log('ListTools request received');
    const toolsList = [
      ...tools.transactionTools,
      ...tools.financialDataTools,
      ...tools.stockTools,
      ...tools.userTools,
    ];
    console.log(`Returning ${toolsList.length} tools`);
    return {
      tools: toolsList,
    };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
      switch (name) {
        case "enrichTransaction":
          return tools.enrichTransaction(synthClient, args as { transaction: string });

        case "getLiveRates":
          return tools.getLiveRates(synthClient, args as { from: string; to: string });
        case "getHistoricalRates":
          return tools.getHistoricalRates(synthClient, args as { from: string; to: string; date?: string });

        case "searchTickers":
          return tools.searchTickers(synthClient, args as { query: string });
        case "getOpenClosePrices":
          return tools.getOpenClosePrices(synthClient, args as { ticker: string; startDate: string; endDate?: string; page?: number; perPage?: number });

        case "getUserInfo":
          return tools.getUserInfo(synthClient);
        case "getInsiderTrades":
          return tools.getInsiderTrades(synthClient, args as { ticker?: string; page?: number; limit?: number });

        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      };
    }
  });

  console.log('Connecting MCP server to transport...');
  try {
    await server.connect(transport);
    console.log('MCP server connected successfully');
  } catch (error) {
    console.error('Error connecting MCP server:', error);
    throw error;
  }
});

// Message endpoint for MCP
app.post('/message', (req, res) => {
  console.log('Message endpoint hit');
  console.log('Body:', JSON.stringify(req.body));
  // SSEServerTransport handles the message processing
  res.status(200).send();
});

// Clean up old tokens periodically (older than 30 days)
setInterval(() => {
  tokenStore.cleanup(30);
}, 24 * 60 * 60 * 1000); // Daily cleanup

app.listen(PORT, () => {
  console.log(`Synth MCP Server running on http://localhost:${PORT}`);
  console.log(`Documentation: http://localhost:${PORT}/`);
  console.log(`Connect page: http://localhost:${PORT}/connect`);
  console.log(`SSE endpoint: http://localhost:${PORT}/sse`);
});