// Tool keyword mappings to help LLMs understand when to use each tool
export const toolKeywords = {
  getInsiderTrades: [
    "insider trading",
    "insider trades",
    "insider transactions",
    "executive trades",
    "director trades",
    "officer trades",
    "insider buying",
    "insider selling",
    "SEC Form 4",
    "insider activity",
    "management trades",
    "board member trades",
    "C-suite trades",
    "CEO trades",
    "CFO trades",
    "insider stock transactions",
    "company insider trades",
    "recent insider activity",
    "last insider trade",
    "latest insider transactions"
  ],
  
  enrichTransaction: [
    "decode transaction",
    "bank transaction",
    "cryptic transaction",
    "merchant name",
    "transaction description",
    "bank statement",
    "unclear charge",
    "what is this charge",
    "identify merchant",
    "transaction details"
  ],
  
  getLiveRates: [
    "exchange rate",
    "currency rate",
    "forex rate",
    "current rate",
    "live rate",
    "real-time rate",
    "convert currency",
    "currency conversion",
    "how much is",
    "exchange",
    "FX rate"
  ],
  
  getHistoricalRates: [
    "historical rate",
    "past exchange rate",
    "rate on date",
    "historical currency",
    "exchange rate history",
    "previous rate",
    "rate in the past"
  ],
  
  searchTickers: [
    "find stock",
    "search stock",
    "ticker symbol",
    "stock symbol",
    "company ticker",
    "what's the ticker",
    "find ticker",
    "stock code"
  ],
  
  getOpenClosePrices: [
    "stock price",
    "historical price",
    "open price",
    "close price",
    "stock history",
    "price history",
    "OHLC",
    "daily price",
    "stock data"
  ],
  
  getUserInfo: [
    "user info",
    "account info",
    "my account",
    "API usage",
    "credits remaining",
    "user details"
  ]
};