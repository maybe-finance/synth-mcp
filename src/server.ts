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

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Store registered endpoints with their API keys
const registeredEndpoints = new Map<string, { apiKey: string; createdAt: Date }>();

// Enable CORS for Claude Desktop
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'synth-mcp' });
});

// Root endpoint - show registration page
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
      max-width: 600px;
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
    .success {
      display: none;
      background: #d4edda;
      color: #155724;
      padding: 1rem;
      border-radius: 4px;
      margin-top: 1rem;
    }
    .endpoint-url {
      background: #f8f9fa;
      padding: 1rem;
      border-radius: 4px;
      font-family: monospace;
      word-break: break-all;
      margin: 1rem 0;
      border: 1px solid #dee2e6;
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
    <h1>Connect Synth to Claude Desktop</h1>
    <div class="info">
      Generate a unique endpoint URL for your Synth MCP connection.
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
      <button type="submit">Generate Endpoint</button>
    </form>
    <div id="success" class="success">
      <h2>Success!</h2>
      <p>Your unique MCP endpoint URL is:</p>
      <div id="endpointUrl" class="endpoint-url"></div>
      <p>Add this URL to Claude Desktop as your MCP server endpoint.</p>
    </div>
  </div>
  <script>
    document.getElementById('authForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const apiKey = document.getElementById('apiKey').value;
      
      try {
        const response = await fetch('/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ apiKey })
        });
        
        const data = await response.json();
        
        if (response.ok) {
          const endpointUrl = window.location.origin + '/sse/' + data.endpoint;
          document.getElementById('endpointUrl').textContent = endpointUrl;
          document.getElementById('success').style.display = 'block';
          
          // Copy to clipboard
          navigator.clipboard.writeText(endpointUrl).then(() => {
            document.getElementById('success').innerHTML += '<p style="color: #28a745; margin-top: 0.5rem;">✓ Copied to clipboard!</p>';
          });
        } else {
          alert(data.error || 'Registration failed');
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

// Registration endpoint
app.post('/register', async (req, res) => {
  const { apiKey } = req.body;
  
  if (!apiKey) {
    return res.status(400).json({ error: 'API key is required' });
  }
  
  try {
    // Validate API key
    const synthClient = new SynthClient(apiKey);
    await synthClient.getUser();
    
    // Generate unique endpoint
    const endpoint = crypto.randomBytes(16).toString('hex');
    
    // Store the mapping
    registeredEndpoints.set(endpoint, {
      apiKey,
      createdAt: new Date()
    });
    
    res.json({ success: true, endpoint });
  } catch (error) {
    res.status(401).json({ error: 'Invalid API key' });
  }
});

// SSE endpoint for MCP with unique endpoints
app.get('/sse/:endpoint?', async (req, res) => {
  console.log('SSE endpoint accessed');
  console.log('Endpoint:', req.params.endpoint);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  
  let apiKey: string | undefined;
  
  // Check if this is a registered endpoint
  if (req.params.endpoint) {
    const registration = registeredEndpoints.get(req.params.endpoint);
    if (registration) {
      apiKey = registration.apiKey;
    }
  }
  
  // Fall back to header/query param for backwards compatibility
  if (!apiKey) {
    apiKey = 
      req.headers.authorization?.replace('Bearer ', '') ||
      req.headers['x-api-key'] as string ||
      req.query.apiKey as string;
  }
  
  if (!apiKey) {
    res.status(401).json({ 
      error: 'Authentication required',
      message: 'Please visit the root URL to register and get your unique endpoint'
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

// Clean up old registrations periodically (older than 30 days)
setInterval(() => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  for (const [endpoint, registration] of registeredEndpoints.entries()) {
    if (registration.createdAt < thirtyDaysAgo) {
      registeredEndpoints.delete(endpoint);
    }
  }
}, 24 * 60 * 60 * 1000); // Daily cleanup

app.listen(PORT, () => {
  console.log(`Synth MCP running on http://localhost:${PORT}`);
  console.log(`Registration page: http://localhost:${PORT}`);
  console.log(`SSE endpoint: http://localhost:${PORT}/sse`);
});