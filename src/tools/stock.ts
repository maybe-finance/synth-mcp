import { SynthClient } from "../synth-client.js";
import { enhancedToolDescriptions } from "./enhanced-descriptions.js";

export const stockTools = [
  {
    name: "searchTickers",
    description: enhancedToolDescriptions.searchTickers.keywords.join(", ") + ". Examples: " + enhancedToolDescriptions.searchTickers.exampleQueries.join("; "),
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Search query - can be a full ticker symbol (e.g., 'AAPL'), partial ticker (e.g., 'AAP'), company name (e.g., 'Apple', 'Apple Inc', 'Apple Computer'), partial company name (e.g., 'Appl', 'Micro'), industry terms (e.g., 'bank', 'tech', 'retail'), or any text that might match a company or ticker. Supports partial matching, fuzzy matching, and will return multiple results if multiple matches are found.",
        },
      },
      required: ["query"],
    },
  },
  {
    name: "getOpenClosePrices",
    description: enhancedToolDescriptions.getOpenClosePrices.keywords.join(", ") + ". Examples: " + enhancedToolDescriptions.getOpenClosePrices.exampleQueries.join("; "),
    inputSchema: {
      type: "object",
      properties: {
        ticker: {
          type: "string",
          description: "Stock ticker symbol (e.g., AAPL for Apple, MSFT for Microsoft, GOOGL for Google, AMZN for Amazon, TSLA for Tesla, META for Meta/Facebook, NFLX for Netflix, NVDA for Nvidia, JPM for JP Morgan, BAC for Bank of America, WMT for Walmart, JNJ for Johnson & Johnson, V for Visa, MA for Mastercard, DIS for Disney, HD for Home Depot, PG for Procter & Gamble, UNH for UnitedHealth, PYPL for PayPal, ADBE for Adobe, CRM for Salesforce, ORCL for Oracle, CSCO for Cisco, PEP for PepsiCo, KO for Coca-Cola, NKE for Nike, MCD for McDonald's, T for AT&T, VZ for Verizon, INTC for Intel, AMD for AMD, IBM for IBM, GE for General Electric, BA for Boeing, CAT for Caterpillar, MMM for 3M, CVX for Chevron, XOM for Exxon Mobil). Can be any valid US stock ticker, ETF symbol, or other security identifier.",
        },
        startDate: {
          type: "string",
          description: "Start date for price data in YYYY-MM-DD format (e.g., 2024-01-01, 2023-12-31, 2023-01-01, 2022-01-01). Can be any valid historical date. This is the beginning of the date range for which you want price data.",
        },
        endDate: {
          type: "string",
          description: "End date for price data in YYYY-MM-DD format (e.g., 2024-01-31, 2023-12-31, 2024-12-31). If not specified, only returns data for the startDate. Use this to get a range of dates, multiple days, weeks, months, or years of price history.",
        },
        page: {
          type: "number",
          description: "Page number for pagination when retrieving large date ranges. Useful when getting years of historical data that may span multiple pages. Optional, defaults to 1.",
        },
        perPage: {
          type: "number",
          description: "Number of results per page. Controls how many days of price data are returned per page. Optional, defaults to 100. Maximum is typically 1000.",
        },
      },
      required: ["ticker", "startDate"],
    },
  },
];

export async function searchTickers(
  client: SynthClient,
  args: { query: string }
) {
  const results = await client.searchTickers(args.query);
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(results, null, 2),
      },
    ],
  };
}

export async function getOpenClosePrices(
  client: SynthClient,
  args: { ticker: string; startDate: string; endDate?: string; page?: number; perPage?: number }
) {
  const prices = await client.getOpenClosePrices(args.ticker, args.startDate, args.endDate, args.page, args.perPage);
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(prices, null, 2),
      },
    ],
  };
}