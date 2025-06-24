#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { SynthClient } from "./synth-client.js";
import * as tools from "./tools/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for Claude Desktop
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
  credentials: true,
}));

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'synth-mcp' });
});

// SSE endpoint for MCP
app.get('/sse', async (req, res) => {
  console.log('SSE endpoint accessed');
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Query params:', JSON.stringify(req.query, null, 2));
  
  // Check multiple places for API key
  let apiKey = 
    req.headers.authorization?.replace('Bearer ', '') ||
    req.headers['x-api-key'] as string ||
    req.query.apiKey as string ||
    req.query.api_key as string;
  
  if (!apiKey) {
    // Return HTML page for API key entry when accessed via browser
    const acceptHeader = req.headers.accept || '';
    if (acceptHeader.includes('text/html')) {
      const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Connect Synth MCP to Claude</title>
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
      max-width: 400px;
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
    input:focus {
      outline: none;
      border-color: #007bff;
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
    .error {
      color: #dc3545;
      margin-top: 0.5rem;
      font-size: 0.875rem;
    }
    .info {
      background: #e7f3ff;
      padding: 0.75rem;
      border-radius: 4px;
      margin-bottom: 1rem;
      font-size: 0.875rem;
      color: #004080;
    }
    .success {
      display: none;
      background: #d4edda;
      color: #155724;
      padding: 1rem;
      border-radius: 4px;
      margin-top: 1rem;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Connect Synth to Claude</h1>
    <div class="info">
      To connect Claude to your Synth Finance account, you need to update your Claude Desktop configuration.
    </div>
    <form id="authForm">
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
      <button type="submit">Generate Configuration</button>
      <div id="error" class="error"></div>
    </form>
    <div id="success" class="success">
      <h2>Configuration Generated!</h2>
      <p>Add this to your Claude Desktop MCP settings:</p>
      <pre id="config" style="background: #f8f9fa; padding: 1rem; border-radius: 4px; text-align: left; overflow-x: auto;"></pre>
    </div>
  </div>
  <script>
    document.getElementById('authForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const apiKey = document.getElementById('apiKey').value;
      const errorDiv = document.getElementById('error');
      const successDiv = document.getElementById('success');
      const configPre = document.getElementById('config');
      
      // Generate configuration
      const config = {
        "synth": {
          "command": "npx",
          "args": ["-y", "synth-mcp"],
          "env": {
            "SYNTH_API_KEY": apiKey
          }
        }
      };
      
      // Show configuration
      configPre.textContent = JSON.stringify(config, null, 2);
      successDiv.style.display = 'block';
      errorDiv.textContent = '';
      
      // Copy to clipboard
      navigator.clipboard.writeText(JSON.stringify(config, null, 2)).then(() => {
        successDiv.innerHTML += '<p style="color: #28a745; margin-top: 0.5rem;">✓ Copied to clipboard!</p>';
      }).catch(() => {
        successDiv.innerHTML += '<p style="margin-top: 0.5rem;">Please copy the configuration above.</p>';
      });
    });
  </script>
</body>
</html>
      `;
      res.send(html);
      return;
    }
    
    res.status(401).json({ 
      error: 'API key required',
      message: 'Please provide your Synth API key via Authorization header, X-API-Key header, or apiKey query parameter'
    });
    return;
  }

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
    return {
      tools: [
        ...tools.transactionTools,
        ...tools.financialDataTools,
        ...tools.stockTools,
        ...tools.userTools,
      ],
    };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
      switch (name) {
        // Transaction tools
        case "enrichTransaction":
          return tools.enrichTransaction(synthClient, args as { transaction: string });

        // Financial data tools
        case "getLiveRates":
          return tools.getLiveRates(synthClient, args as { from: string; to: string });
        case "getHistoricalRates":
          return tools.getHistoricalRates(synthClient, args as { from: string; to: string; date?: string });

        // Stock tools
        case "searchTickers":
          return tools.searchTickers(synthClient, args as { query: string });
        case "getOpenClosePrices":
          return tools.getOpenClosePrices(synthClient, args as { ticker: string; startDate: string; endDate?: string; page?: number; perPage?: number });

        // User tools
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

  await server.connect(transport);
});

// Message endpoint for MCP
app.post('/message', (req, res) => {
  // This is handled by the SSE transport
  res.status(200).send();
});

app.listen(PORT, () => {
  console.log(`Synth MCP running on http://localhost:${PORT}`);
  console.log(`SSE endpoint: http://localhost:${PORT}/sse`);
});