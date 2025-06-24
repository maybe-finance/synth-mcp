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
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'synth-mcp' });
});

// SSE endpoint for MCP
app.get('/sse', async (req, res) => {
  const apiKey = req.headers.authorization?.replace('Bearer ', '');
  
  if (!apiKey) {
    res.status(401).json({ error: 'API key required. Please provide your Synth API key in the Authorization header.' });
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