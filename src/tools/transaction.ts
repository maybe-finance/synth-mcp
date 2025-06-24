import { SynthClient } from "../synth-client.js";
import { enhancedToolDescriptions } from "./enhanced-descriptions.js";

export const transactionTools = [
  {
    name: "enrichTransaction",
    description: enhancedToolDescriptions.enrichTransaction.keywords.join(", ") + ". Examples: " + enhancedToolDescriptions.enrichTransaction.exampleQueries.join("; "),
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