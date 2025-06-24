#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { SynthClient } from "./synth-client.js";
import * as tools from "./tools/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Session storage (in production, use Redis or similar)
const sessionStore = new Map<string, { apiKey: string; expiresAt: Date }>();

// Enable CORS for Claude Desktop
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'synth-mcp-secret-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'synth-mcp' });
});

// Auth page endpoint - serves login form
app.get('/auth', (req, res) => {
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
  </style>
</head>
<body>
  <div class="container">
    <h1>Connect Synth to Claude</h1>
    <div class="info">
      Enter your Synth API key to connect Claude to your Synth Finance account.
    </div>
    <form id="authForm">
      <div class="form-group">
        <label for="apiKey">API Key</label>
        <input 
          type="password" 
          id="apiKey" 
          name="apiKey" 
          placeholder="Enter your Synth API key"
          required
        />
      </div>
      <button type="submit">Connect</button>
      <div id="error" class="error"></div>
    </form>
  </div>
  <script>
    document.getElementById('authForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const apiKey = document.getElementById('apiKey').value;
      const errorDiv = document.getElementById('error');
      
      try {
        const response = await fetch('/auth/callback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ apiKey }),
          credentials: 'same-origin'
        });
        
        const data = await response.json();
        
        if (response.ok) {
          // Store session token
          const sessionToken = data.sessionToken;
          
          // Redirect back to Claude with success
          window.location.href = '/auth/success?token=' + sessionToken;
        } else {
          errorDiv.textContent = data.error || 'Authentication failed';
        }
      } catch (error) {
        errorDiv.textContent = 'Connection error. Please try again.';
      }
    });
  </script>
</body>
</html>
  `;
  res.send(html);
});

// Auth callback endpoint - processes login
app.post('/auth/callback', async (req, res) => {
  const { apiKey } = req.body;
  
  if (!apiKey) {
    return res.status(400).json({ error: 'API key is required' });
  }
  
  try {
    // Validate API key by making a test request
    const synthClient = new SynthClient(apiKey);
    await synthClient.getUser();
    
    // Generate session token
    const sessionToken = uuidv4();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // 24 hour expiry
    
    // Store session
    sessionStore.set(sessionToken, { apiKey, expiresAt });
    
    res.json({ success: true, sessionToken });
  } catch (error) {
    res.status(401).json({ error: 'Invalid API key' });
  }
});

// Success page
app.get('/auth/success', (req, res) => {
  const token = req.query.token;
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Success - Synth MCP</title>
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
      text-align: center;
    }
    h1 {
      color: #28a745;
      margin: 0 0 1rem 0;
      font-size: 1.5rem;
    }
    .token-info {
      background: #f8f9fa;
      padding: 1rem;
      border-radius: 4px;
      margin: 1rem 0;
      word-break: break-all;
      font-family: monospace;
      font-size: 0.875rem;
    }
    .instructions {
      font-size: 0.875rem;
      color: #666;
      margin-top: 1rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>✓ Successfully Connected!</h1>
    <p>Synth has been connected to Claude. You can now close this window and return to Claude.</p>
    <div class="instructions">
      Your connection will remain active for 24 hours.
    </div>
  </div>
  <script>
    // Auto-close after 3 seconds
    setTimeout(() => {
      window.close();
    }, 3000);
  </script>
</body>
</html>
  `;
  res.send(html);
});

// SSE endpoint for MCP - now uses session tokens
app.get('/sse', async (req, res) => {
  // First check for session token in query params (from auth flow)
  const sessionToken = req.query.token as string;
  
  // Fall back to Authorization header for backwards compatibility
  const authHeader = req.headers.authorization?.replace('Bearer ', '');
  
  let apiKey: string | undefined;
  
  if (sessionToken) {
    const session = sessionStore.get(sessionToken);
    if (session && session.expiresAt > new Date()) {
      apiKey = session.apiKey;
    }
  } else if (authHeader) {
    // Direct API key in header (backwards compatibility)
    apiKey = authHeader;
  }
  
  if (!apiKey) {
    // Redirect to auth page
    res.redirect('/auth');
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

// Clean up expired sessions periodically
setInterval(() => {
  const now = new Date();
  for (const [token, session] of sessionStore.entries()) {
    if (session.expiresAt < now) {
      sessionStore.delete(token);
    }
  }
}, 60 * 60 * 1000); // Every hour

app.listen(PORT, () => {
  console.log(`Synth MCP running on http://localhost:${PORT}`);
  console.log(`Authentication page: http://localhost:${PORT}/auth`);
  console.log(`SSE endpoint: http://localhost:${PORT}/sse`);
});