#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import dotenv from "dotenv";
import { SynthClient } from "./synth-client.js";
import * as tools from "./tools/index.js";

dotenv.config();

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

const synthClient = new SynthClient(process.env.SYNTH_API_KEY || "");

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

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);