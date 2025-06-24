import { SynthClient } from "../synth-client.js";

export const financialDataTools = [
  {
    name: "getLiveRates",
    description: "Get current real-time live currency exchange rates, forex rates, FX rates, foreign exchange rates, currency conversion rates, international exchange rates, spot rates, current rates, today's rates, latest rates, up-to-date rates, real-time conversion, currency pair rates, cross rates, base currency rates, quote currency rates, bid ask rates, mid-market rates, interbank rates, wholesale rates, retail rates, tourist rates, cash rates, wire transfer rates, remittance rates, international money transfer rates, forex market rates, currency market prices, exchange rate quotes, FX quotes, currency values, relative currency strength, currency pair pricing, international currency rates, global exchange rates, world currency rates, major currency pairs, minor currency pairs, exotic currency pairs, G10 currencies, emerging market currencies, crypto to fiat rates, digital currency rates, stablecoin rates, central bank rates, official exchange rates, market exchange rates, spot exchange rates, forward rates, currency indices, currency baskets, trade weighted rates, effective exchange rates, nominal rates, real exchange rates, purchasing power parity, currency conversions, money exchange, bureau de change rates, airport exchange rates, online exchange rates, currency calculator rates, travel money rates, holiday money rates, business exchange rates, commercial rates, payment rates, settlement rates, transaction rates. Updated every 60 seconds with the latest market data.",
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
    description: "Get historical currency exchange rates, past exchange rates, previous rates, historical forex data, past FX rates, historical foreign exchange, previous day rates, last week rates, last month rates, last year rates, historical currency values, past currency prices, historical conversion rates, archive exchange rates, historical forex quotes, past currency data, historical FX data, time series exchange rates, historical currency pairs, past market rates, previous exchange values, historical spot rates, past interbank rates, historical mid-market rates, previous day closing rates, end of day rates, historical daily rates, past weekly rates, historical monthly rates, past yearly rates, historical currency performance, past currency movements, historical exchange rate data, archive currency rates, historical forex market data, past currency conversions, previous period rates, historical exchange rate trends, past currency fluctuations, historical volatility data, currency rate history, exchange rate archives, historical currency charts, past rate comparisons, historical currency analysis, previous rate lookups, past exchange rate queries, historical rate calculations, retrospective currency data, historical financial data, past monetary exchange rates, previous forex market prices, historical international rates, past global currency rates, archive exchange data, historical rate records, past currency valuations, previous market exchange rates, historical trading rates, past official rates, historical central bank rates, previous day's rates, last trading day rates, historical closing prices, past opening rates, historical average rates, previous period averages, historical rate ranges, past high low rates, historical rate movements, currency rate archives, exchange rate history, forex history, FX history, currency pair history, historical rate analysis, past rate reports, historical rate research, previous rate information, historical exchange rate database, past currency rate records, archive rate data, historical pricing data, past value data, previous exchange information, historical conversion data. Useful for analysis, reporting, accounting, tax calculations, historical comparisons, trend analysis, and backtesting.",
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