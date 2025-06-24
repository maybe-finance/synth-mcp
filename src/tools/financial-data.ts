import { SynthClient } from "../synth-client.js";
import { enhancedToolDescriptions } from "./enhanced-descriptions.js";

export const financialDataTools = [
  {
    name: "getLiveRates",
    description: enhancedToolDescriptions.getLiveRates.keywords.join(", ") + ". Examples: " + enhancedToolDescriptions.getLiveRates.exampleQueries.join("; "),
    inputSchema: {
      type: "object",
      properties: {
        from: {
          type: "string",
          description: "Source/base currency code in 3-letter ISO format (e.g., USD for US Dollar, EUR for Euro, GBP for British Pound, JPY for Japanese Yen, CHF for Swiss Franc, CAD for Canadian Dollar, AUD for Australian Dollar, NZD for New Zealand Dollar, CNY for Chinese Yuan, INR for Indian Rupee, KRW for Korean Won, SGD for Singapore Dollar, HKD for Hong Kong Dollar, NOK for Norwegian Krone, SEK for Swedish Krona, DKK for Danish Krone, PLN for Polish Zloty, THB for Thai Baht, IDR for Indonesian Rupiah, HUF for Hungarian Forint, CZK for Czech Koruna, ILS for Israeli Shekel, CLP for Chilean Peso, PHP for Philippine Peso, AED for UAE Dirham, COP for Colombian Peso, SAR for Saudi Riyal, MYR for Malaysian Ringgit, RON for Romanian Leu). Defaults to USD if not specified.",
          default: "USD",
        },
        to: {
          type: "string",
          description: "Target currency code(s) in 3-letter ISO format. Can be a single currency or comma-separated list for multiple currencies (e.g., 'EUR' or 'EUR,GBP,JPY'). Supports all major world currencies, emerging market currencies, and some digital currencies.",
        },
      },
      required: ["to"],
    },
  },
  {
    name: "getHistoricalRates",
    description: enhancedToolDescriptions.getHistoricalRates.keywords.join(", ") + ". Examples: " + enhancedToolDescriptions.getHistoricalRates.exampleQueries.join("; "),
    inputSchema: {
      type: "object",
      properties: {
        from: {
          type: "string",
          description: "Source/base currency code in 3-letter ISO format (e.g., USD for US Dollar, EUR for Euro, GBP for British Pound, JPY for Japanese Yen, CHF for Swiss Franc, CAD for Canadian Dollar, AUD for Australian Dollar, NZD for New Zealand Dollar, CNY for Chinese Yuan, INR for Indian Rupee). Defaults to USD if not specified.",
          default: "USD",
        },
        to: {
          type: "string",
          description: "Target currency code(s) in 3-letter ISO format. Can be a single currency or comma-separated list for multiple currencies (e.g., 'EUR' or 'EUR,GBP,JPY'). Supports all major world currencies.",
        },
        date: {
          type: "string",
          description: "Historical date in YYYY-MM-DD format (e.g., 2024-01-15, 2023-12-31, 2022-06-30). Can be any date in the past. If not specified, defaults to today's date. Use this for getting rates on specific dates, end of month rates, end of quarter rates, end of year rates, or any specific historical date.",
        },
      },
      required: ["to"],
    },
  },
];

export async function getLiveRates(
  client: SynthClient,
  args: { from: string; to: string }
) {
  const rates = await client.getLiveRates(args.from, args.to);
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(rates, null, 2),
      },
    ],
  };
}

export async function getHistoricalRates(
  client: SynthClient,
  args: { from: string; to: string; date?: string }
) {
  const rates = await client.getHistoricalRates(args.from, args.to, args.date);
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(rates, null, 2),
      },
    ],
  };
}