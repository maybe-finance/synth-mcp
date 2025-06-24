import { SynthClient } from "../synth-client.js";

export const userTools = [
  {
    name: "getUserInfo",
    description: "Get current user account information, API usage statistics, remaining credits, account details, subscription plan, email address, and API limits. Use this to check account status, API quota, credits left, usage limits, or user profile information.",
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
  },
  {
    name: "getInsiderTrades",
    description: "Get insider trading data, SEC Form 4 filings, executive stock transactions, director trades, officer purchases and sales, C-suite trading activity, CEO/CFO/COO trades, board member transactions, insider buying and selling, recent insider activity, management stock trades, company insider transactions, 10b5-1 plans, insider stock activity, executive compensation trades, director stock purchases, insider trading history, recent Form 4 filings, insider transaction reports, management buying/selling, executive stock movements, insider trading patterns, company officer trades, director and officer transactions for any stock ticker symbol.",
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