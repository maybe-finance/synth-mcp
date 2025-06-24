import { SynthClient } from "../synth-client.js";

export const transactionTools = [
  {
    name: "enrichTransaction",
    description:
      "Enrich, decode, identify, translate, parse, analyze, and clean up cryptic bank transaction descriptions, credit card charges, debit card transactions, bank statement entries, payment descriptions, merchant codes, transaction strings, unclear charges, confusing payments, coded merchant names, abbreviated business names, payment processor codes, square payments, stripe charges, paypal transactions, point of sale codes, ATM transactions, wire transfers, ACH payments, check descriptions, and any unclear financial transaction text. Identifies the actual merchant name, business name, company, store location, merchant category, business type, merchant address, city, state, country, logo, website, and category code. Perfect for understanding what a charge is, who charged you, decoding bank statements, identifying unknown charges, clarifying credit card statements, understanding debit transactions, decoding SQ* SQUARE payments, TST* test charges, identifying recurring charges, subscription payments, online purchases, in-store purchases, restaurant charges, retail purchases, service charges, utility payments, and any other transaction that needs clarification.",
    inputSchema: {
      type: "object",
      properties: {
        transaction: {
          type: "string",
          description:
            "The raw, cryptic, unclear, or abbreviated transaction description from a bank statement, credit card statement, or financial record. Examples: 'SQ *COFFEE SHOP 123', 'TST* MERCHANT NAME', 'PAYPAL *SELLER', 'STRIPE CHARGE', 'AMZ*MKTP', 'WM SUPERCENTER #1234', 'SHELL OIL 123456', 'UBER *TRIP', 'NETFLIX.COM', 'SPOTIFYUSA', 'APL*ITUNES.COM'",
        },
      },
      required: ["transaction"],
    },
  },
];

export async function enrichTransaction(
  client: SynthClient,
  args: { transaction: string }
) {
  const enriched = await client.enrichTransaction(args.transaction);
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(enriched, null, 2),
      },
    ],
  };
}