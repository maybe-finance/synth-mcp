import axios, { AxiosInstance } from "axios";

export class SynthClient {
  private client: AxiosInstance;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error("Synth API key is required");
    }

    this.client = axios.create({
      baseURL: "https://api.synthfinance.com",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });
  }

  // Transaction endpoints (documented)
  async enrichTransaction(transaction: string) {
    const response = await this.client.post("/transactions/enrich", {
      transaction,
    });
    return response.data;
  }

  // Rate endpoints (documented)
  async getLiveRates(from: string = "USD", to: string) {
    const response = await this.client.get("/rates/live", {
      params: { from, to },
    });
    return response.data;
  }

  async getHistoricalRates(from: string = "USD", to: string, date?: string) {
    const response = await this.client.get("/rates/historical", {
      params: { from, to, date },
    });
    return response.data;
  }


  // Stock/ticker endpoints (documented)
  async searchTickers(query: string) {
    const response = await this.client.get("/tickers/search", {
      params: { q: query },
    });
    return response.data;
  }

  async getOpenClosePrices(
    ticker: string,
    startDate: string,
    endDate?: string,
    page?: number,
    perPage?: number
  ) {
    const response = await this.client.get(`/tickers/${ticker}/open-close`, {
      params: {
        start_date: startDate,
        end_date: endDate || startDate,
        page,
        per_page: perPage,
      },
    });
    return response.data;
  }

  // User endpoint (documented)
  async getUser() {
    const response = await this.client.get("/user");
    return response.data;
  }

  // Insider trades endpoint (documented)
  async getInsiderTrades(ticker?: string, page?: number, limit?: number) {
    const response = await this.client.get("/insider-trades", {
      params: { ticker, page, limit },
    });
    return response.data;
  }
}