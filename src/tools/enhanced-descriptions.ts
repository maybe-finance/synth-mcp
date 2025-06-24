// Enhanced tool descriptions with extensive keywords for maximum discoverability

export const enhancedToolDescriptions = {
  enrichTransaction: {
    keywords: [
      // Basic transaction terms
      "transaction", "charge", "payment", "debit", "credit", "purchase", "expense",
      "bank transaction", "bank charge", "bank debit", "bank statement",
      "credit card charge", "debit card charge", "card transaction",
      
      // Questions about transactions
      "what is this charge", "what is this transaction", "what is this payment",
      "who charged me", "who is this merchant", "what merchant is this",
      "identify this charge", "identify this transaction", "identify this merchant",
      "decode this transaction", "decode this charge", "decode this payment",
      "explain this charge", "explain this transaction", "explain this payment",
      "clarify this charge", "clarify this transaction", "clarify this payment",
      "understand this charge", "understand this transaction", "understand this payment",
      
      // Cryptic transaction patterns
      "SQ *", "SQ*", "SQUARE *", "TST*", "TST *", "PAYPAL *", "PP *",
      "STRIPE", "STRP", "AMZ*", "AMZN*", "AMAZON*", "WM SUPERCENTER",
      "WALMART", "SHELL OIL", "CHEVRON", "EXXON", "UBER *", "LYFT *",
      "DOORDASH", "GRUBHUB", "NETFLIX", "SPOTIFY", "APPLE.COM", "ITUNES",
      "GOOGLE *", "MSFT*", "MICROSOFT", "FB *", "META *", "INSTAGRAM",
      
      // Transaction types
      "recurring charge", "subscription", "monthly charge", "annual charge",
      "one-time payment", "recurring payment", "automatic payment",
      "online purchase", "in-store purchase", "POS transaction",
      "ATM withdrawal", "wire transfer", "ACH payment", "check payment",
      "direct debit", "standing order", "bill payment", "utility payment",
      
      // Merchant information needs
      "merchant name", "merchant details", "merchant info", "merchant address",
      "merchant location", "merchant category", "business name", "company name",
      "store name", "vendor name", "seller name", "payee name",
      "merchant logo", "company logo", "business logo",
      "merchant website", "company website", "business website",
      "merchant type", "business type", "merchant category code", "MCC",
      
      // Action words
      "enrich", "enhance", "decode", "decipher", "translate", "interpret",
      "identify", "recognize", "detect", "discover", "find out", "figure out",
      "look up", "search for", "investigate", "research", "analyze",
      "parse", "process", "clean up", "clarify", "explain", "describe",
      
      // Banking terms
      "bank statement line", "statement entry", "transaction description",
      "payment description", "charge description", "debit description",
      "transaction details", "payment details", "charge details",
      "transaction history", "payment history", "charge history",
      "account activity", "account transaction", "account charge",
      
      // Common questions
      "unknown charge", "mysterious charge", "unclear charge", "confusing charge",
      "strange transaction", "weird payment", "unfamiliar merchant",
      "unrecognized charge", "unidentified transaction", "suspicious charge",
      "fraudulent charge", "disputed charge", "questionable transaction",
      
      // Financial platforms
      "paypal transaction", "venmo payment", "cash app charge", "zelle transfer",
      "apple pay", "google pay", "samsung pay", "contactless payment",
      "digital wallet", "mobile payment", "online banking transaction",
      "bill pay service", "payment processor", "payment gateway",
      
      // Specific use cases
      "expense report", "expense tracking", "expense categorization",
      "bookkeeping", "accounting", "financial records", "tax preparation",
      "budget tracking", "spending analysis", "merchant verification",
      "fraud detection", "transaction monitoring", "payment reconciliation"
    ],
    
    exampleQueries: [
      "What is this charge: SQ *COFFEE SHOP 4155551234",
      "Decode TST* MERCHANT NAME 123",
      "Who charged me PAYPAL *JOHNDOE",
      "Identify this transaction: WM SUPERCENTER #1234",
      "What merchant is AMZ*MKTP US*RT4Y56789",
      "Explain this charge from my bank statement: STRIPE CHARGE 1234567890",
      "What is UBER *TRIP HELP.UBER.COM",
      "Clarify this payment: NETFLIX.COM 8885638999",
      "Find out what SQ *BLUE BOTTLE C is",
      "What store is POS DEBIT WALMART 5678",
      "Identify merchant for SHELL OIL 574476QPSHELL",
      "Decode this cryptic charge: APL*ITUNES.COM/BILL",
      "What is this subscription: SPOTIFY P0F3G5H6J7",
      "Enrich this transaction description: GOOGLE *GSUITE_DOMAIN",
      "Help me understand: AMZN MKTP US*2A3B4C5D6E"
    ]
  },

  getLiveRates: {
    keywords: [
      // Basic rate terms
      "exchange rate", "currency rate", "forex rate", "FX rate",
      "conversion rate", "current rate", "live rate", "real-time rate",
      "spot rate", "market rate", "today's rate", "latest rate",
      
      // Currency conversion questions
      "convert currency", "currency conversion", "exchange currency",
      "how much is", "what is the rate", "current exchange rate",
      "today's exchange rate", "live exchange rate", "real-time exchange rate",
      "USD to EUR", "EUR to USD", "GBP to USD", "USD to GBP",
      "dollar to euro", "euro to dollar", "pound to dollar", "yen to dollar",
      
      // Specific queries
      "how much is 100 dollars in euros", "convert 50 EUR to USD",
      "what's the exchange rate between", "current rate for",
      "how many euros per dollar", "how many dollars per pound",
      "exchange rate right now", "currency rate right now",
      "latest forex rates", "current forex rates", "live forex",
      
      // Professional terms
      "spot exchange rate", "interbank rate", "mid-market rate",
      "wholesale rate", "retail rate", "buy rate", "sell rate",
      "bid rate", "ask rate", "spread", "forex quote", "FX quote",
      "currency pair", "base currency", "quote currency", "cross rate",
      
      // Travel and business
      "travel money", "holiday money", "vacation currency",
      "business exchange rate", "commercial rate", "tourist rate",
      "airport exchange rate", "bank exchange rate", "online rate",
      "money exchange", "currency exchange", "foreign exchange",
      
      // International transfers
      "wire transfer rate", "international transfer rate", "remittance rate",
      "money transfer rate", "sending money abroad", "international payment",
      "cross-border payment", "global payment", "overseas transfer",
      
      // Trading terms
      "forex trading", "currency trading", "FX trading", "spot trading",
      "currency market", "forex market", "FX market", "foreign exchange market",
      "currency fluctuation", "exchange rate movement", "rate volatility",
      
      // Major currencies
      "USD", "EUR", "GBP", "JPY", "CHF", "CAD", "AUD", "NZD",
      "dollar", "euro", "pound", "yen", "franc", "canadian dollar",
      "australian dollar", "new zealand dollar", "sterling", "cable",
      
      // Emerging currencies
      "CNY", "INR", "BRL", "RUB", "ZAR", "MXN", "SGD", "HKD",
      "yuan", "renminbi", "rupee", "real", "ruble", "rand", "peso",
      "singapore dollar", "hong kong dollar", "won", "ringgit",
      
      // Crypto references
      "BTC to USD", "ETH to EUR", "crypto to fiat", "bitcoin rate",
      "ethereum rate", "cryptocurrency exchange", "digital currency rate",
      "stablecoin rate", "USDT rate", "USDC rate", "crypto conversion",
      
      // Time-specific
      "rate now", "current rate", "live rate", "real-time rate",
      "up-to-the-minute rate", "instant rate", "immediate rate",
      "rate at this moment", "rate right now", "present rate",
      
      // Calculation needs
      "calculate exchange", "compute rate", "figure out conversion",
      "work out exchange", "determine rate", "find exchange rate",
      "check rate", "verify rate", "confirm rate", "validate rate"
    ],
    
    exampleQueries: [
      "What's the current exchange rate from USD to EUR?",
      "Convert 100 dollars to euros",
      "How much is 50 GBP in USD right now?",
      "Get live forex rates for EUR/USD",
      "Current exchange rate between dollar and yen",
      "Real-time currency conversion USD to CAD",
      "What's today's rate for euros?",
      "How many pounds per dollar?",
      "Latest exchange rate USD to GBP",
      "Convert currency from EUR to JPY",
      "Live rates for major currencies",
      "Current forex quotes for USD",
      "Exchange rate calculator USD to EUR",
      "Real-time FX rates for trading",
      "Spot rate for EUR/USD"
    ]
  },

  getHistoricalRates: {
    keywords: [
      // Historical terms
      "historical rate", "past rate", "previous rate", "old rate",
      "rate history", "exchange rate history", "historical exchange rate",
      "past exchange rate", "previous exchange rate", "former rate",
      
      // Date-specific queries
      "rate on", "exchange rate on", "rate for date", "rate on specific date",
      "what was the rate", "historical rate for", "past rate for",
      "rate last week", "rate last month", "rate last year",
      "rate on January 1", "rate on December 31", "end of year rate",
      "rate yesterday", "yesterday's rate", "previous day rate",
      
      // Accounting and reporting
      "year-end rate", "month-end rate", "quarter-end rate",
      "closing rate", "historical closing rate", "reporting rate",
      "accounting rate", "tax rate", "fiscal year rate",
      "financial statement rate", "audit rate", "compliance rate",
      
      // Analysis terms
      "rate trend", "rate history", "historical analysis", "rate comparison",
      "rate movement", "historical volatility", "rate fluctuation history",
      "exchange rate trend", "currency performance", "historical performance",
      
      // Business needs
      "invoice rate", "contract rate", "transaction date rate",
      "settlement rate", "payment date rate", "purchase date rate",
      "historical invoice rate", "past transaction rate", "old payment rate",
      
      // Research and analysis
      "backtesting rate", "historical data", "rate archive", "rate database",
      "historical forex data", "past FX rates", "currency history",
      "exchange rate research", "historical study", "rate investigation",
      
      // Specific periods
      "2023 exchange rate", "2022 rate", "last year's rate",
      "Q1 rate", "Q2 rate", "Q3 rate", "Q4 rate", "quarterly rate",
      "January rate", "February rate", "December rate", "monthly rate",
      "beginning of year", "end of year", "mid-year rate",
      
      // Comparison needs
      "compare historical rates", "rate difference", "rate change",
      "how much did rate change", "rate appreciation", "rate depreciation",
      "currency strengthening", "currency weakening", "rate evolution",
      
      // Professional use
      "historical spot rate", "past interbank rate", "previous market rate",
      "historical mid-market rate", "past official rate", "old central bank rate",
      "historical forex quote", "past FX quote", "previous currency quote",
      
      // Legal and compliance
      "regulatory rate", "compliance rate", "official historical rate",
      "government rate", "central bank historical rate", "published rate",
      "reference rate", "benchmark rate", "standard rate"
    ],
    
    exampleQueries: [
      "What was the USD to EUR rate on January 1, 2023?",
      "Historical exchange rate for December 31, 2022",
      "Get exchange rate from last month",
      "EUR/USD rate on 2023-06-15",
      "What was the pound to dollar rate last year?",
      "Historical forex rates for Q4 2023",
      "Past exchange rate for tax purposes",
      "Year-end rate for EUR/USD 2022",
      "Exchange rate on specific date: March 15, 2023",
      "Historical currency data for analysis",
      "Previous month's exchange rates",
      "Rate history for USD to GBP",
      "What was yesterday's exchange rate?",
      "Monthly average rate for January 2023",
      "Historical rate for accounting purposes"
    ]
  },

  searchTickers: {
    keywords: [
      // Basic search terms
      "find stock", "search stock", "look up stock", "find ticker",
      "search ticker", "look up ticker", "find symbol", "search symbol",
      "ticker symbol", "stock symbol", "company ticker", "stock code",
      
      // Company searches
      "find company", "search company", "look up company", "company stock",
      "what's the ticker for", "ticker for company", "symbol for company",
      "stock symbol for", "find ticker symbol", "get ticker symbol",
      
      // Common companies
      "Apple stock", "Microsoft stock", "Google stock", "Amazon stock",
      "Tesla stock", "Facebook stock", "Meta stock", "Netflix stock",
      "Apple ticker", "Microsoft ticker", "Google ticker", "Amazon ticker",
      "AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "META", "NFLX",
      
      // Industry searches
      "tech stocks", "bank stocks", "retail stocks", "energy stocks",
      "healthcare stocks", "pharma stocks", "biotech stocks", "fintech stocks",
      "automotive stocks", "airline stocks", "restaurant stocks", "REIT stocks",
      
      // Market cap searches
      "large cap stocks", "mega cap stocks", "mid cap stocks", "small cap stocks",
      "blue chip stocks", "penny stocks", "growth stocks", "value stocks",
      "dividend stocks", "high yield stocks", "S&P 500 stocks", "Dow stocks",
      
      // ETF searches
      "find ETF", "search ETF", "ETF ticker", "index fund", "sector ETF",
      "SPY", "QQQ", "DIA", "IWM", "VTI", "VOO", "GLD", "SLV",
      "technology ETF", "healthcare ETF", "financial ETF", "energy ETF",
      
      // Partial searches
      "stocks starting with A", "tickers beginning with", "symbols containing",
      "companies with name", "stocks like", "similar to", "related to",
      "competitors of", "peers of", "alternatives to", "companies in sector",
      
      // Questions
      "what's the symbol for Apple", "what's Apple's ticker",
      "how do I find stock symbol", "where to find ticker",
      "list of stocks", "stock directory", "ticker lookup", "symbol lookup",
      
      // International
      "NYSE stocks", "NASDAQ stocks", "US stocks", "American stocks",
      "listed companies", "public companies", "traded companies",
      "exchange listings", "stock exchange search", "market listings",
      
      // Verification
      "verify ticker", "confirm symbol", "check ticker", "validate symbol",
      "is this a valid ticker", "does this ticker exist", "active ticker",
      "correct symbol for", "right ticker for", "accurate symbol",
      
      // Discovery
      "discover stocks", "explore stocks", "browse stocks", "stock ideas",
      "investment opportunities", "stock suggestions", "ticker recommendations",
      "new stocks", "IPO stocks", "recently listed", "newly public",
      
      // Specific sectors
      "AI stocks", "EV stocks", "renewable energy", "cloud computing",
      "cybersecurity stocks", "blockchain stocks", "cannabis stocks",
      "gaming stocks", "streaming stocks", "social media stocks",
      
      // Analysis needs
      "stock screener", "stock filter", "stock search criteria",
      "fundamental screener", "technical screener", "stock scanner",
      "watchlist stocks", "portfolio stocks", "tracking list"
    ],
    
    exampleQueries: [
      "Find ticker for Apple",
      "What's the stock symbol for Microsoft?",
      "Search for Amazon stock",
      "Tesla ticker symbol",
      "Find all tech stocks",
      "Look up ticker AAPL",
      "Search companies with 'bank' in name",
      "What's the symbol for JP Morgan?",
      "Find ETFs for technology sector",
      "Search for renewable energy stocks",
      "Stocks similar to GOOGL",
      "Find all airline tickers",
      "What's Netflix's ticker symbol?",
      "Search for dividend stocks",
      "Find S&P 500 companies"
    ]
  },

  getOpenClosePrices: {
    keywords: [
      // Basic price terms
      "stock price", "share price", "stock quote", "price history",
      "historical price", "past price", "previous price", "old price",
      "open price", "opening price", "close price", "closing price",
      "high price", "low price", "daily high", "daily low",
      
      // OHLC terms
      "OHLC", "OHLCV", "open high low close", "daily bars", "price bars",
      "candlestick", "candle data", "daily candles", "price candles",
      "daily data", "EOD data", "end of day", "daily prices",
      
      // Time periods
      "price on date", "price for date", "historical data", "date range",
      "price between dates", "prices from to", "multi-day prices",
      "weekly prices", "monthly prices", "yearly prices", "annual prices",
      
      // Chart data
      "chart data", "graph data", "plot data", "visualization data",
      "technical data", "price chart", "stock chart", "historical chart",
      "candlestick chart", "bar chart", "line chart data",
      
      // Volume
      "trading volume", "share volume", "volume data", "daily volume",
      "historical volume", "volume history", "trading activity",
      "market activity", "shares traded", "turnover", "liquidity data",
      
      // Analysis terms
      "price analysis", "technical analysis", "price action", "price movement",
      "price trend", "price pattern", "support resistance", "price levels",
      "52 week high", "52 week low", "all time high", "all time low",
      
      // Performance
      "stock performance", "price performance", "return data", "gain loss",
      "price change", "percent change", "price difference", "price comparison",
      "YTD performance", "annual return", "monthly return", "daily return",
      
      // Backtesting
      "backtest data", "strategy testing", "historical testing", "simulation data",
      "quantitative data", "algo trading data", "systematic data", "model data",
      
      // Specific needs
      "earnings date price", "dividend date price", "ex-dividend price",
      "split adjusted", "dividend adjusted", "corporate action adjusted",
      "actual prices", "unadjusted prices", "raw prices", "clean prices",
      
      // Trading strategies
      "swing trading data", "day trading data", "position data", "trend data",
      "momentum data", "mean reversion", "breakout data", "volatility data",
      "range data", "consolidation data", "accumulation data", "distribution data",
      
      // Research
      "research data", "academic data", "study data", "analysis data",
      "financial modeling", "valuation data", "fundamental data overlay",
      "event study data", "market study", "correlation data", "beta calculation",
      
      // Professional use
      "institutional data", "hedge fund data", "quant data", "prop trading data",
      "risk management data", "portfolio data", "benchmark data", "index comparison",
      "relative performance", "peer comparison", "sector performance", "market outperformance",
      
      // Specific date queries
      "price last week", "price last month", "price last year",
      "price in January", "price in 2023", "Q1 prices", "Q4 prices",
      "year to date prices", "month to date", "week to date", "rolling prices"
    ],
    
    exampleQueries: [
      "Get AAPL stock prices for January 2024",
      "Historical data for MSFT from 2023-01-01 to 2023-12-31",
      "Show me Tesla's OHLC data for last month",
      "Daily prices for GOOGL in Q4 2023",
      "Get opening and closing prices for AMZN",
      "Stock chart data for META last year",
      "OHLCV data for SPY ETF",
      "Historical prices for Apple stock in 2023",
      "Candlestick data for NVDA last quarter",
      "Daily high low for Microsoft this month",
      "Price history for TSLA from start date to end date",
      "Get volume data for AAPL in December",
      "Technical analysis data for Amazon",
      "52 week price range for Google",
      "Backtesting data for S&P 500"
    ]
  },

  getUserInfo: {
    keywords: [
      // Account terms
      "account", "user account", "my account", "account info", "account details",
      "user info", "user details", "profile", "user profile", "my profile",
      "account status", "account settings", "account data", "account information",
      
      // Subscription terms
      "subscription", "plan", "subscription plan", "pricing plan", "account plan",
      "current plan", "my plan", "active plan", "subscription status", "plan details",
      "subscription tier", "account tier", "membership", "membership level",
      
      // Usage terms
      "API usage", "usage stats", "usage statistics", "API calls", "API limits",
      "credits", "credits remaining", "credits used", "credit balance", "API credits",
      "quota", "API quota", "usage quota", "remaining quota", "quota limit",
      "rate limit", "API rate limit", "calls remaining", "requests remaining",
      
      // Billing terms
      "billing", "billing info", "payment info", "payment method", "billing details",
      "invoice", "billing history", "payment history", "charges", "fees",
      "renewal date", "next billing", "billing cycle", "payment due",
      
      // Personal info
      "email", "email address", "registered email", "account email",
      "name", "account name", "user name", "display name", "profile name",
      "contact info", "contact details", "personal info", "personal details",
      
      // Status checks
      "account active", "is my account active", "account valid", "account expired",
      "subscription active", "subscription valid", "subscription expired",
      "trial status", "free trial", "trial remaining", "trial expired",
      
      // Limits and restrictions
      "API limit", "call limit", "request limit", "daily limit", "monthly limit",
      "rate limiting", "throttling", "usage cap", "bandwidth limit", "data limit",
      "restrictions", "account restrictions", "plan limitations", "tier limits",
      
      // Account management
      "manage account", "update account", "account dashboard", "control panel",
      "settings", "preferences", "configuration", "account configuration",
      "profile settings", "API settings", "notification settings", "privacy settings",
      
      // API key info
      "API key", "API token", "access token", "authentication", "credentials",
      "API credentials", "developer key", "secret key", "public key", "private key",
      
      // Support
      "help", "support", "contact support", "get help", "assistance",
      "documentation", "API docs", "user guide", "tutorial", "how to",
      
      // Monitoring
      "monitor usage", "track usage", "usage monitoring", "usage tracking",
      "API monitoring", "usage dashboard", "analytics", "usage analytics",
      "activity log", "API log", "request log", "usage history", "call history"
    ],
    
    exampleQueries: [
      "Show my account information",
      "What's my current plan?",
      "How many API credits do I have left?",
      "Check my API usage",
      "Get user account details",
      "What's my subscription status?",
      "How many API calls remaining?",
      "Show my usage statistics",
      "What's my account email?",
      "Check my API quota",
      "Am I on the free plan?",
      "When does my subscription renew?",
      "What are my API limits?",
      "Display account status",
      "Get my profile information"
    ]
  },

  getInsiderTrades: {
    keywords: [
      // Basic insider terms
      "insider trading", "insider trades", "insider transactions", "insider activity",
      "insider buying", "insider selling", "insider purchases", "insider sales",
      "executive trades", "executive transactions", "executive buying", "executive selling",
      
      // SEC terms
      "Form 4", "SEC Form 4", "Form 4 filing", "SEC filing", "insider filing",
      "regulatory filing", "mandatory disclosure", "insider disclosure", "SEC report",
      "EDGAR filing", "SEC database", "insider report", "transaction report",
      
      // People types
      "CEO trades", "CFO trades", "COO trades", "CTO trades", "CMO trades",
      "president trades", "vice president trades", "EVP trades", "SVP trades",
      "director trades", "board member trades", "board of directors", "board trades",
      "officer trades", "company officer", "corporate officer", "executive officer",
      "C-suite trades", "C-level trades", "management trades", "leadership trades",
      "founder trades", "co-founder trades", "chairman trades", "insider ownership",
      
      // Transaction types
      "stock purchase", "stock sale", "share purchase", "share sale",
      "open market purchase", "open market sale", "private transaction",
      "option exercise", "stock option", "RSU vesting", "restricted stock",
      "stock grant", "stock award", "compensation", "equity compensation",
      "10b5-1 plan", "planned sale", "automatic sale", "scheduled transaction",
      
      // Ownership terms
      "beneficial owner", "10% owner", "major shareholder", "significant shareholder",
      "institutional holder", "insider ownership", "management ownership", "float",
      "shares outstanding", "ownership percentage", "stake", "position size",
      
      // Analysis terms
      "insider sentiment", "management confidence", "insider signal", "buy signal",
      "sell signal", "insider indicator", "management faith", "executive confidence",
      "cluster buying", "cluster selling", "unusual activity", "significant trades",
      
      // Time-based queries
      "recent insider trades", "latest insider activity", "last insider trade",
      "today's insider trades", "this week's trades", "this month's trades",
      "recent Form 4", "latest Form 4", "newest filings", "current activity",
      
      // Pattern recognition
      "insider buying pattern", "insider selling pattern", "trading pattern",
      "historical insider activity", "insider trend", "management trend",
      "buying streak", "selling streak", "accumulation", "distribution",
      
      // Value terms
      "trade value", "transaction value", "dollar amount", "trade size",
      "large trades", "significant trades", "material trades", "notable trades",
      "million dollar trades", "bulk trades", "block trades", "major transactions",
      
      // Specific questions
      "who's buying", "who's selling", "which insiders", "what executives",
      "management activity", "director activity", "officer activity",
      "are insiders buying", "are insiders selling", "insider consensus",
      
      // Company-specific
      "Apple insider trades", "AAPL insider activity", "Microsoft insiders",
      "Tesla executive trades", "Amazon management trades", "Google insider selling",
      "tech company insiders", "bank executive trades", "energy insider activity",
      
      // Alerts and monitoring
      "insider alert", "trading alert", "Form 4 alert", "filing alert",
      "monitor insiders", "track insiders", "watch insider activity", "follow insiders",
      "insider watchlist", "executive watchlist", "director monitoring", "filing tracker",
      
      // Due diligence
      "investment research", "fundamental analysis", "company research", "DD",
      "due diligence", "investment signal", "buy indicator", "sell indicator",
      "red flag", "warning sign", "positive signal", "bullish signal", "bearish signal",
      
      // Compliance and legal
      "legal insider trading", "reported trades", "disclosed trades", "public filings",
      "transparent trading", "compliant trading", "window period", "blackout period",
      "quiet period", "earnings blackout", "trading window", "permitted trading"
    ],
    
    exampleQueries: [
      "Show insider trades for AAPL",
      "Recent insider activity for Apple",
      "Who's been buying TSLA stock?",
      "Latest Form 4 filings for Microsoft",
      "Executive trades in AMZN",
      "Director buying in Google",
      "CEO trades for META",
      "Insider selling in NVDA",
      "Recent management transactions for Tesla",
      "Board member activity in Amazon",
      "10% owner trades in Apple",
      "Significant insider purchases this week",
      "Which executives are selling MSFT?",
      "Insider trading pattern for AAPL",
      "Last 10 insider transactions for Google"
    ]
  }
};