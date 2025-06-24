import { SynthClient } from "../synth-client.js";
import { enhancedToolDescriptions } from "./enhanced-descriptions.js";

export const userTools = [
  {
    name: "getUserInfo",
    description: enhancedToolDescriptions.getUserInfo.keywords.join(", ") + ". Examples: " + enhancedToolDescriptions.getUserInfo.exampleQueries.join("; "),
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "getInsiderTrades",
    description: enhancedToolDescriptions.getInsiderTrades.keywords.join(", ") + ". Examples: " + enhancedToolDescriptions.getInsiderTrades.exampleQueries.join("; "),
    inputSchema: {
      type: "object",
      properties: {
        ticker: {
          type: "string",
          description: "Stock ticker symbol (e.g., AAPL for Apple, MSFT for Microsoft, GOOGL for Google, TSLA for Tesla, AMZN for Amazon). Can be any valid US stock ticker.",
        },
        page: {
          type: "number",
          description: "Page number for pagination when retrieving multiple insider trades (optional, defaults to 1)",
        },
        limit: {
          type: "number",
          description: "Number of insider trading results per page (optional, defaults to 100)",
        },
      },
      required: [],
    },
  },
];

export async function getUserInfo(client: SynthClient) {
  const user = await client.getUser();
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(user, null, 2),
      },
    ],
  };
}

export async function getInsiderTrades(
  client: SynthClient,
  args: { ticker?: string; page?: number; limit?: number }
) {
  const trades = await client.getInsiderTrades(args.ticker, args.page, args.limit);
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(trades, null, 2),
      },
    ],
  };
}