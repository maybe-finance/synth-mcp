TITLE: Defining Company Data Properties in JSON Schema
DESCRIPTION: This JSON snippet defines various properties for a company object within a schema, including basic information, identifiers, address details, leadership, industry classification, employee count, and market data points with types, examples, and default values.
SOURCE: https://docs.synthfinance.com/reference/search-tickers

LANGUAGE: JSON
CODE:
```
                            "example": "Apple is among the largest companies in the world, with a broad portfolio of hardware and software products targeted at consumers and businesses. Apple's iPhone makes up a majority of the firm sales, and Apple's other products like Mac, iPad, and Watch are designed around the iPhone as the focal point of an expansive software ecosystem. Apple has progressively worked to add new applications, like streaming video, subscription bundles, and augmented reality. The firm designs its own software and semiconductors while working with subcontractors like Foxconn and TSMC to build its products and chips. Slightly less than half of Apple's sales come directly through its flagship stores, with a majority of sales coming indirectly through partnerships and distribution."
                          },
                          "kind": {
                            "type": "string",
                            "example": "CS"
                          },
                          "cik": {
                            "type": "string",
                            "example": "0000320193"
                          },
                          "list_date": {
                            "type": "string",
                            "example": "1980-12-12"
                          },
                          "address": {
                            "type": "object",
                            "properties": {
                              "address_line1": {
                                "type": "string",
                                "example": "One Apple Park Way"
                              },
                              "city": {
                                "type": "string",
                                "example": "Cupertino"
                              },
                              "state": {
                                "type": "string",
                                "example": "CA"
                              },
                              "postal_code": {
                                "type": "string",
                                "example": "95014"
                              },
                              "country": {
                                "type": "string",
                                "example": "USA"
                              }
                            }
                          },
                          "ceo": {
                            "type": "string",
                            "example": "Tim Cook"
                          },
                          "founding_year": {
                            "type": "integer",
                            "example": 1976,
                            "default": 0
                          },
                          "industry": {
                            "type": "string",
                            "example": "Consumer Electronics"
                          },
                          "sector": {
                            "type": "string",
                            "example": "Technology"
                          },
                          "phone": {
                            "type": "string",
                            "example": "(408) 996-1010"
                          },
                          "sic_code": {
                            "type": "string",
                            "example": "3571"
                          },
                          "sic_description": {
                            "type": "string",
                            "example": "ELECTRONIC COMPUTERS"
                          },
                          "total_employees": {
                            "type": "integer",
                            "example": 161000,
                            "default": 0
                          },
                          "composite_figi": {
                            "type": "string",
                            "example": "BBG000B9XRY4"
                          },
                          "share_class_figi": {
                            "type": "string",
                            "example": "BBG001S5N8V8"
                          },
                          "symbol_root": {
                            "type": "string",
                            "example": "AAPL"
                          },
                          "market_data": {
                            "type": "object",
                            "properties": {
                              "high_today": {
                                "type": "number",
                                "example": 227.13,
                                "default": 0
                              },
                              "low_today": {
                                "type": "number",
                                "example": 225.18,
                                "default": 0
                              },
                              "open_today": {

```

----------------------------------------

TITLE: Sample Insider Trading Transaction Data - JSON
DESCRIPTION: This JSON snippet provides an example of the data structure used to represent insider trading transactions. It includes an array of transaction objects, each detailing a specific trade by an insider, their role, transaction type, date, shares, price, value, ownership type, and links to the official filing.
SOURCE: https://docs.synthfinance.com/reference/list-insider-trades

LANGUAGE: JSON
CODE:
```
{\n  \"data\": [\n    {\n      \"ticker\": \"AAPL\",\n      \"exchange\": {\n        \"name\": null,\n        \"mic_code\": \"XNGS\"\n      },\n      \"full_name\": \"Adams Katherine L.\",\n      \"position\": \"SVP, GC and Secretary\",\n      \"roles\": [\n        \"Officer\"\n      ],\n      \"formatted_roles\": \"Officer\",\n      \"transaction_date\": \"2024-11-05\",\n      \"transaction_type\": \"G\",\n      \"transaction_code\": \"G\",\n      \"formatted_transaction_code\": \"G\",\n      \"shares\": 8000,\n      \"price\": 0,\n      \"formatted_price\": \"$0.00\",\n      \"value\": 0,\n      \"formatted_value\": \"$0.00\",\n      \"ownership_type\": \"D\",\n      \"formatted_ownership_type\": \"Direct\",\n      \"post_transaction_shares\": 179043,\n      \"summary\": \"Adams Katherine L. (Officer) traded 8,000 shares at $0.00 per share for a total value of $0.00 on November 05, 2024\",\n      \"ownership_summary\": \"After this transaction, the insider owns 179,043 shares direct\",\n      \"filing_link\": \"https://www.sec.gov/Archives/edgar/data/320193/000032019324000126/xslF345X05/wk-form4_1731022209.xml\"\n    },\n    {\n      \"ticker\": \"AAPL\",\n      \"exchange\": {\n        \"name\": null,\n        \"mic_code\": \"XNGS\"\n      },\n      \"full_name\": \"Kondo Chris\",\n      \"position\": \"Principal Accounting Officer\",\n      \"roles\": [\n        \"Officer\"\n      ],\n      \"formatted_roles\": \"Officer\",\n      \"transaction_date\": \"2024-10-15\",\n      \"transaction_type\": \"Payment of Exercise Price\",\n      \"transaction_code\": \"F\",\n      \"formatted_transaction_code\": \"Payment of Exercise Price\",\n      \"shares\": 3985,\n      \"price\": 233.85,\n      \"formatted_price\": \"$233.85\",\n      \"value\": 931892.25,\n      \"formatted_value\": \"$931,892.25\",\n      \"ownership_type\": \"D\",\n      \"formatted_ownership_type\": \"Direct\",\n      \"post_transaction_shares\": 19549,\n      \"summary\": \"Kondo Chris (Officer) traded 3,985 shares at $233.85 per share for a total value of $931,892.25 on October 15, 2024\",\n      \"ownership_summary\": \"After this transaction, the insider owns 19,549 shares direct\",\n      \"filing_link\": \"https://www.sec.gov/Archives/edgar/data/320193/000032019324000116/xslF345X05/wk-form4_1729204211.xml\",\n      \"footnotes\": \"Shares withheld by Apple to satisfy tax withholding requirements on vesting of restricted stock units. No shares were sold.\"\n    },\n    {\n      \"ticker\": \"AAPL\",\n      \"exchange\": {\n        \"name\": null,\n        \"mic_code\": \"XNGS\"\n      },\n      \"full_name\": \"Kondo Chris\",\n      \"position\": \"Principal Accounting Officer\",\n      \"roles\": [\n        \"Officer\"\n      ],\n      \"formatted_roles\": \"Officer\",\n      \"transaction_date\": \"2024-10-15\",\n      \"transaction_type\": \"Exercise/Conversion\",\n      \"transaction_code\": \"M\",\n      \"formatted_transaction_code\": \"Exercise/Conversion\",\n      \"shares\": 8115,\n      \"price\": 0,\n      \"formatted_price\": \"$0.00\",\n      \"value\": 0,\n      \"formatted_value\": \"$0.00\",\n      \"ownership_type\": \"D\",\n      \"formatted_ownership_type\": \"Direct\",\n      \"post_transaction_shares\": 23534,\n      \"summary\": \"Kondo Chris (Officer) traded 8,115 shares at $0.00 per share for a total value of $0.00 on October 15, 2024\",\n      \"ownership_summary\": \"After this transaction, the insider owns 23,534 shares direct\",\n      \"filing_link\": \"https://www.sec.gov/Archives/edgar/data/320193/000032019324000116/xslF345X05/wk-form4_1729204211.xml\",\n      \"footnotes\": \"Each restricted stock unit represents the right to receive, at settlement, one share of common stock. This transaction represents the settlement of restricted stock units in shares of common stock on their scheduled vesting date.\"\n    },\n    {\n      \"ticker\": \"AAPL\",\n      \"exchange\": {\n        \"name\": null,\n        \"mic_code\": \"XNGS\"\n      },\n      \"full_name\": \"Maestri Luca\",\n      \"position\": \"Senior Vice President, CFO\",\n      \"roles\": [\n        \"Officer\"\n      ],\n      \"formatted_roles\": \"Officer\",\n      \"transaction_date\": \"2024-10-04\",\n      \"transaction_type\": \"Sale\",\n      \"transaction_code\": \"S\",\n      \"formatted_transaction_code\": \"Sale\",\n      \"shares\": 59305,\n      \"price\": 226.52,\n      \"formatted_price\": \"$226.52\",\n      \"value\": 13433768.6,\n      \"formatted_value\": \"$13,433,768.60\",\n      \"ownership_type\": \"D\",\n      \"formatted_ownership_type\": \"Direct\",\n      \"post_transaction_shares\": 107788,\n      \"summary\": \"Maestri Luca (Officer) sold 59,305 shares at $226.52 per share for a total value of $13,433,768.60 on October 04, 2024\",\n      \"ownership_summary\": \"After this transaction, the insider owns 107,788 shares direct\",\n      \"filing_link\": \"https://www.sec.gov/Archives/edgar/da
```

----------------------------------------

TITLE: Example Insider Trades API Response (JSON)
DESCRIPTION: An example of the JSON structure returned by the insider trades API endpoint, including data records, pagination information, and metadata.
SOURCE: https://docs.synthfinance.com/reference/list-insider-trades

LANGUAGE: json
CODE:
```
{
  "data": [
    {
      "filing_link": "https://www.sec.gov/Archives/edgar/data/320193/000032019324000114/xslF345X05/wk-form4_1728426607.xml",
      "footnotes": "This transaction was made pursuant to a Rule 10b5-1 trading plan adopted by the reporting person on November 11, 2023.\nThis transaction was executed in
```

----------------------------------------

TITLE: Example API Response Schema (JSON)
DESCRIPTION: This JSON snippet provides an OpenAPI/Swagger definition for the response structure of a GET request to retrieve open/close stock data. It specifies the schema for a successful 200 response, including data items, pagination details, and metadata like credit usage. It also defines a basic schema for a 400 error response.
SOURCE: https://docs.synthfinance.com/reference/openclose

LANGUAGE: json
CODE:
```
{
  "paths": {
    "/tickers/{ticker}/open-close": {
      "get": {
        "summary": "Get Open/Close Stock Data",
        "operationId": "get-tickers-ticker-open-close",
        "parameters": [
          {
            "schema": {
              "type": "string"
            },
            "name": "ticker",
            "in": "path",
            "required": true,
            "description": "The ticker symbol of the stock."
          },
          {
            "schema": {
              "type": "string"
            },
            "name": "start_date",
            "in": "query",
            "required": true,
            "description": "The start date for the data (YYYY-MM-DD)."
          },
          {
            "schema": {
              "type": "string"
            },
            "name": "end_date",
            "in": "query",
            "description": "The end date for the data (YYYY-MM-DD). Defaults to start_date."
          },
          {
            "schema": {
              "type": "integer",
              "default": 1
            },
            "name": "page",
            "in": "query",
            "description": "The page number for pagination."
          },
          {
            "schema": {
              "type": "integer",
              "default": 100
            },
            "name": "per_page",
            "in": "query",
            "description": "The number of results per page."
          }
        ],
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"data\": [\n    {\n      \"ticker\": \"AAPL\",\n      \"date\": \"2024-05-27\",\n      \"open\": 190.83,\n      \"close\": 190.83,\n      \"high\": 190.83,\n      \"low\": 190.83,\n      \"volume\": 0\n    }\n  ],\n  \"pagination\": {\n    \"next_url\": \"/tickers/aapl/open-close?start_date=2024-05-27&page=2\",\n    \"total_records\": 3,\n    \"current_page\": 1,\n    \"per_page\": 100,\n    \"total_pages\": 1\n  },\n  \"meta\": {\n    \"credits_used\": 1,\n    \"credits_remaining\": 925\n  }\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "ticker": {
                            "type": "string",
                            "example": "AAPL"
                          },
                          "date": {
                            "type": "string",
                            "example": "2024-05-27"
                          },
                          "open": {
                            "type": "number",
                            "example": 190.83
                          },
                          "close": {
                            "type": "number",
                            "example": 190.83
                          },
                          "high": {
                            "type": "number",
                            "example": 190.83
                          },
                          "low": {
                            "type": "number",
                            "example": 190.83
                          },
                          "volume": {
                            "type": "integer",
                            "example": 0
                          }
                        }
                      }
                    },
                    "pagination": {
                      "type": "object",
                      "properties": {
                        "next_url": {
                          "type": "string",
                          "example": "/tickers/aapl/open-close?start_date=2024-05-27&page="
                        },
                        "total_records": {
                          "type": "integer",
                          "example": 3,
                          "default": 0
                        },
                        "current_page": {
                          "type": "integer",
                          "example": 1,
                          "default": 0
                        },
                        "per_page": {
                          "type": "integer",
                          "example": 100,
                          "default": 0
                        },
                        "total_pages": {
                          "type": "integer",
                          "example": 1,
                          "default": 0
                        }
                      }
                    },
                    "meta": {
                      "type": "object",
                      "properties": {
                        "credits_used": {
                          "type": "integer",
                          "example": 1,
                          "default": 0
                        },
                        "credits_remaining": {
                          "type": "integer",
                          "example": 925,
                          "default": 0
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "400",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {}
                }
              }
            }
          }
        },
        "deprecated": false
      }
    }
  },
  "x-readme": {
    "headers": [],
    "explorer-enabled": true,
    "proxy-enabled": true
  },
  "x-readme-fauxas": true
}
```

----------------------------------------

TITLE: Insider Trades API Response Schema
DESCRIPTION: This JSON snippet defines the expected structure for a successful (200) response from the insider trades API endpoint. It includes the main data payload (`data`), pagination information (`paging`), and API metadata (`meta`). The `data` array contains objects detailing individual insider transactions.
SOURCE: https://docs.synthfinance.com/reference/list-insider-trades

LANGUAGE: json
CODE:
```
{
  "paths": {
    "/insider-trades": {
      "get": {
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "shares": {
                            "type": "integer",
                            "example": 8000,
                            "default": 0
                          },
                          "price": {
                            "type": "integer",
                            "example": 0,
                            "default": 0
                          },
                          "formatted_price": {
                            "type": "string",
                            "example": "$0.00"
                          },
                          "value": {
                            "type": "integer",
                            "example": 0,
                            "default": 0
                          },
                          "formatted_value": {
                            "type": "string",
                            "example": "$0.00"
                          },
                          "ownership_type": {
                            "type": "string",
                            "example": "D"
                          },
                          "formatted_ownership_type": {
                            "type": "string",
                            "example": "Direct"
                          },
                          "post_transaction_shares": {
                            "type": "integer",
                            "example": 179043,
                            "default": 0
                          },
                          "summary": {
                            "type": "string",
                            "example": "Adams Katherine L. (Officer) traded 8,000 shares at $0.00 per share for a total value of $0.00 on November 05, 2024"
                          },
                          "ownership_summary": {
                            "type": "string",
                            "example": "After this transaction, the insider owns 179,043 shares direct"
                          },
                          "filing_link": {
                            "type": "string",
                            "example": "https://www.sec.gov/Archives/edgar/data/320193/000032019324000126/xslF345X05/wk-form4_1731022209.xml"
                          }
                        }
                      }
                    },
                    "paging": {
                      "type": "object",
                      "properties": {
                        "prev": {
                          "type": "string",
                          "example": "/insider-trades?ticker=AAPL&limit=5&page="
                        },
                        "next": {
                          "type": "string",
                          "example": "/insider-trades?ticker=AAPL&limit=5&page=2"
                        },
                        "total_records": {
                          "type": "integer",
                          "example": 100,
                          "default": 0
                        },
                        "current_page": {
                          "type": "integer",
                          "example": 1,
                          "default": 0
                        },
                        "per_page": {
                          "type": "integer",
                          "example": 5,
                          "default": 0
                        },
                        "total_pages": {
                          "type": "integer",
                          "example": 20,
                          "default": 0
                        }
                      }
                    },
                    "meta": {
                      "type": "object",
                      "properties": {
                        "credits_used": {
                          "type": "integer",
                          "example": 1,
                          "default": 0
                        },
                        "credits_remaining": {
                          "type": "integer",
                          "example": 907,
                          "default": 0
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "400",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {}
                }
              }
            }
          }
        },
        "deprecated": false
      }
    }
  },
  "x-readme": {
    "headers": [],
    "explorer-enabled": true,
    "proxy-enabled": true
  },
  "x-readme-fauxas": true
}
```

----------------------------------------

TITLE: Defining Live Rates API Endpoint (OpenAPI, JSON)
DESCRIPTION: This JSON snippet provides the OpenAPI 3.1.0 definition for the '/rates/live' GET endpoint. It details the required 'to' parameter (comma-separated currency codes) and the optional 'from' parameter (base currency, defaults to USD). The definition includes response schemas for 200 and 400 status codes, with an example response showing real-time currency rates and metadata.
SOURCE: https://docs.synthfinance.com/reference/live-rates

LANGUAGE: json
CODE:
```
{
  "openapi": "3.1.0",
  "info": {
    "title": "synth-api",
    "version": "1.0"
  },
  "servers": [
    {
      "url": "https://api.synthfinance.com"
    }
  ],
  "components": {
    "securitySchemes": {
      "sec0": {
        "type": "apiKey",
        "in": "header",
        "name": "Authorization",
        "x-bearer-format": "bearer"
      }
    }
  },
  "security": [
    {
      "sec0": []
    }
  ],
  "paths": {
    "/rates/live": {
      "get": {
        "summary": "Live Rates",
        "description": "Real-time rates for any currency. These are updated every 60 seconds.",
        "operationId": "live-rates",
        "parameters": [
          {
            "name": "from",
            "in": "query",
            "description": "The base currency, in 3-character ISO code format, to start with. Defaults to USD.",
            "schema": {
              "type": "string",
              "default": "USD"
            }
          },
          {
            "name": "to",
            "in": "query",
            "description": "Comma-separated string of 3-character ISO codes for the currencies you want to get rates for.",
            "required": true,
            "schema": {
              "type": "string",
              "default": "EUR,GBP"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"data\": {\n    \"date\": \"2024-02-29\",\n    \"time\": \"21:17\",\n    \"source\": \"USD\",\n    \"rates\": {\n      \"EUR\": 0.925393,\n      \"GBP\": 0.792256\n    }\n  },\n  \"meta\": {\n    \"total_records\": 2,\n    \"credits_used\": 1,\n    \"credits_remaining\": 623\n  }\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "data": {
                      "type": "object",
                      "properties": {
                        "date": {
                          "type": "string",
                          "example": "2024-02-29"
                        },
                        "time": {
                          "type": "string",
                          "example": "21:17"
                        },
                        "source": {
                          "type": "string",
                          "example": "USD"
                        },
                        "rates": {
                          "type": "object",
                          "properties": {
                            "EUR": {
                              "type": "number",
                              "example": 0.925393,
                              "default": 0
                            },
                            "GBP": {
                              "type": "number",
                              "example": 0.792256,
                              "default": 0
                            }
                          }
                        }
                      }
                    },
                    "meta": {
                      "type": "object",
                      "properties": {
                        "total_records": {
                          "type": "integer",
                          "example": 2,
                          "default": 0
                        },
                        "credits_used": {
                          "type": "integer",
                          "example": 1,
                          "default": 0
                        },
                        "credits_remaining": {
                          "type": "integer",
                          "example": 623,
                          "default": 0
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "400",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {}
                }
              }
            }
          }
        },
        "deprecated": false
      }
    }
  },
  "x-readme": {
    "headers": [],
    "explorer-enabled": true,
    "proxy-enabled": true
  },
  "x-readme-fauxas": true
}
```

----------------------------------------

TITLE: API Schema Fragment Definition - JSON
DESCRIPTION: This JSON fragment defines schema properties ('type', 'example', 'default') for various fields like 'country', 'credits_used', and 'credits_remaining'. It also includes response definitions for HTTP status codes 200 and 400, specifying content types, examples, and schemas for those responses.
SOURCE: https://docs.synthfinance.com/reference/enrich-transaction

LANGUAGE: JSON
CODE:
```
                          "type": "string",
                          "example": "US"
                        }
                      }
                    },
                    "meta": {
                      "type": "object",
                      "properties": {
                        "credits_used": {
                          "type": "integer",
                          "example": 1,
                          "default": 0
                        },
                        "credits_remaining": {
                          "type": "integer",
                          "example": 249237,
                          "default": 0
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "400",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {}
                }
              }
            }
          }
        },
        "deprecated": false
      }
    }
  },
  "x-readme": {
    "headers": [],
    "explorer-enabled": true,
    "proxy-enabled": true
  },
  "x-readme-fauxas": true
}
```

----------------------------------------

TITLE: Defining API Response Schemas (JSON)
DESCRIPTION: This JSON object specifies the structure and expected content of API responses, including data fields, metadata like record counts and credit usage, and error response formats. It utilizes standard JSON schema properties to describe the data types and provide examples.
SOURCE: https://docs.synthfinance.com/reference/search

LANGUAGE: JSON
CODE:
```
{
  "paths": {
    "/": {
      "get": {
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "phone_number": {
                            "type": "string",
                            "example": "+1512-684-3590"
                          }
                        }
                      }
                    },
                    "meta": {
                      "type": "object",
                      "properties": {
                        "total_records": {
                          "type": "integer",
                          "example": 3,
                          "default": 0
                        },
                        "credits_used": {
                          "type": "integer",
                          "example": 1,
                          "default": 0
                        },
                        "credits_remaining": {
                          "type": "integer",
                          "example": 945,
                          "default": 0
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "400",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {}
                }
              }
            }
          }
        },
        "deprecated": false
      }
    }
  },
  "x-readme": {
    "headers": [],
    "explorer-enabled": true,
    "proxy-enabled": true
  },
  "x-readme-fauxas": true
}
```

----------------------------------------

TITLE: Defining API Response Schemas (JSON)
DESCRIPTION: This JSON snippet defines the structure for API responses, detailing the schema for successful (200) and error (400) responses. It includes data types, examples, and default values for stock metrics like open, high, low, close, volume, and 52-week ranges, as well as metadata like total records and credit usage.
SOURCE: https://docs.synthfinance.com/reference/search-tickers

LANGUAGE: json
CODE:
```
                                "type": "number",
                                "example": 225.77,
                                "default": 0
                              },
                              "close_today": {
                                "type": "number",
                                "example": 227.01,
                                "default": 0
                              },
                              "volume_today": {
                                "type": "integer",
                                "example": 14127454,
                                "default": 0
                              },
                              "fifty_two_week_high": {
                                "type": "number",
                                "example": 237.23,
                                "default": 0
                              },
                              "fifty_two_week_low": {
                                "type": "number",
                                "example": 164.08,
                                "default": 0
                              }
                            }
                          }
                        }
                      }
                    },
                    "meta": {
                      "type": "object",
                      "properties": {
                        "total_records": {
                          "type": "integer",
                          "example": 6,
                          "default": 0
                        },
                        "credits_used": {
                          "type": "integer",
                          "example": 1,
                          "default": 0
                        },
                        "credits_remaining": {
                          "type": "integer",
                          "example": 939,
                          "default": 0
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "400",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {}
                }
              }
            }
          }
        },
        "deprecated": false
      }
    }
  },
  "x-readme": {
    "headers": [],
    "explorer-enabled": true,
    "proxy-enabled": true
  },
  "x-readme-fauxas": true
}
```

----------------------------------------

TITLE: LLMs Text API Endpoint Definition JSON
DESCRIPTION: This JSON object defines the `/llmstxt` API endpoint, including its POST method, summary, description, and detailed response schemas for successful (200) and error (400) responses, specifying the expected content type and schema structure.
SOURCE: https://docs.synthfinance.com/reference/convert

LANGUAGE: JSON
CODE:
```
{
  "paths": {
    "/llmstxt": {
      "post": {
        "operationId": "llmstxt",
        "summary": "LLMs Text",
        "description": "LLMs Text",
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"credits_used\": 1,\n  \"credits_remaining\": 600\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "credits_used": {
                      "type": "integer",
                      "example": 1,
                      "default": 0
                    },
                    "credits_remaining": {
                      "type": "integer",
                      "example": 600,
                      "default": 0
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "400",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {}
                }
              }
            }
          }
        },
        "deprecated": false
      }
    }
  },
  "x-readme": {
    "headers": [],
    "explorer-enabled": true,
    "proxy-enabled": true
  },
  "x-readme-fauxas": true
}
```

----------------------------------------

TITLE: OpenAPI Definition for Historical Rates Endpoint - JSON
DESCRIPTION: This OpenAPI 3.1.0 definition describes the `/rates/historical` GET endpoint. It specifies query parameters for date, base currency ('from'), and target currencies ('to'), defines API key security via the 'Authorization' header, and details the structure of the successful 200 response and the 400 error response.
SOURCE: https://docs.synthfinance.com/reference/historical-rates

LANGUAGE: json
CODE:
```
{
  "openapi": "3.1.0",
  "info": {
    "title": "synth-api",
    "version": "1.0"
  },
  "servers": [
    {
      "url": "https://api.synthfinance.com"
    }
  ],
  "components": {
    "securitySchemes": {
      "sec0": {
        "type": "apiKey",
        "in": "header",
        "name": "Authorization",
        "x-bearer-format": "bearer"
      }
    }
  },
  "security": [
    {
      "sec0": []
    }
  ],
  "paths": {
    "/rates/historical": {
      "get": {
        "summary": "Historical Rates",
        "description": "",
        "operationId": "historical-rates",
        "parameters": [
          {
            "name": "date",
            "in": "query",
            "description": "Defaults to today's date.",
            "schema": {
              "type": "string",
              "format": "date",
              "default": "2024-02-01"
            }
          },
          {
            "name": "from",
            "in": "query",
            "description": "The base currency, in 3-character ISO code format, to start with. Defaults to USD.",
            "schema": {
              "type": "string",
              "default": "USD"
            }
          },
          {
            "name": "to",
            "in": "query",
            "description": "Comma-separated string of 3-character ISO codes for the currencies you want to get rates for.",
            "required": true,
            "schema": {
              "type": "string",
              "default": "EUR,GBP"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"data\": {\n    \"date\": \"2024-02-03\",\n    \"source\": \"USD\",\n    \"rates\": {\n      \"EUR\": 0.926008,\n      \"GBP\": 0.791954\n    }\n  },\n  \"meta\": {\n    \"total_records\": 2,\n    \"credits_used\": 1,\n    \"credits_remaining\": 622\n  }\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "data": {
                      "type": "object",
                      "properties": {
                        "date": {
                          "type": "string",
                          "example": "2024-02-03"
                        },
                        "source": {
                          "type": "string",
                          "example": "USD"
                        },
                        "rates": {
                          "type": "object",
                          "properties": {
                            "EUR": {
                              "type": "number",
                              "example": 0.926008,
                              "default": 0
                            },
                            "GBP": {
                              "type": "number",
                              "example": 0.791954,
                              "default": 0
                            }
                          }
                        }
                      }
                    },
                    "meta": {
                      "type": "object",
                      "properties": {
                        "total_records": {
                          "type": "integer",
                          "example": 2,
                          "default": 0
                        },
                        "credits_used": {
                          "type": "integer",
                          "example": 1,
                          "default": 0
                        },
                        "credits_remaining": {
                          "type": "integer",
                          "example": 622,
                          "default": 0
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "400",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {}
                }
              }
            }
          }
        },
        "deprecated": false
      }
    }
  },
  "x-readme": {
    "headers": [],
    "explorer-enabled": true,
    "proxy-enabled": true
  },
  "x-readme-fauxas": true
}
```

----------------------------------------

TITLE: OpenAPI Definition for User Endpoint - JSON
DESCRIPTION: This snippet provides the full OpenAPI 3.1.0 definition for the `/user` endpoint of the Synth Finance API. It details the GET method, expected 200 and 400 responses, security schemes (API key in header), and example response payloads and schemas.
SOURCE: https://docs.synthfinance.com/reference/get-user

LANGUAGE: json
CODE:
```
{
  "openapi": "3.1.0",
  "info": {
    "title": "synth-api",
    "version": "1.0"
  },
  "servers": [
    {
      "url": "https://api.synthfinance.com"
    }
  ],
  "components": {
    "securitySchemes": {
      "sec0": {
        "type": "apiKey",
        "in": "header",
        "name": "Authorization",
        "x-bearer-format": "bearer"
      }
    }
  },
  "security": [
    {
      "sec0": []
    }
  ],
  "paths": {
    "/user": {
      "get": {
        "summary": "User",
        "description": "Used to pull basic user/account data.",
        "operationId": "get-user",
        "responses": {
          "200": {
            "description": "200",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{\n  \"email\": \"dwight@example.com\",\n  \"name\": \"Dwight Schrute\",\n  \"plan\": \"Free\",\n  \"api_calls_remaining\": 970,\n  \"api_limit\": 1000\n}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {
                    "email": {
                      "type": "string",
                      "example": "dwight@example.com"
                    },
                    "name": {
                      "type": "string",
                      "example": "Dwight Schrute"
                    },
                    "plan": {
                      "type": "string",
                      "example": "Free"
                    },
                    "api_calls_remaining": {
                      "type": "integer",
                      "example": 970,
                      "default": 0
                    },
                    "api_limit": {
                      "type": "integer",
                      "example": 1000,
                      "default": 0
                    }
                  }
                }
              }
            }
          },
          "400": {
            "description": "400",
            "content": {
              "application/json": {
                "examples": {
                  "Result": {
                    "value": "{}"
                  }
                },
                "schema": {
                  "type": "object",
                  "properties": {}
                }
              }
            }
          }
        },
        "deprecated": false
      }
    }
  },
  "x-readme": {
    "headers": [],
    "explorer-enabled": true,
    "proxy-enabled": true
  },
  "x-readme-fauxas": true
}
```