import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface TokenData {
  synthApiKey: string;
  createdAt: string;
  lastUsed: string;
}

class TokenStore {
  private filePath: string;
  private tokens: Map<string, TokenData> = new Map();

  constructor() {
    // Use /tmp for cloud deployments or local data dir
    const dataDir = process.env.TOKEN_STORE_PATH || '/tmp';
    this.filePath = path.join(dataDir, 'synth-mcp-tokens.json');
    this.loadTokens();
  }

  private loadTokens() {
    try {
      if (fs.existsSync(this.filePath)) {
        const data = fs.readFileSync(this.filePath, 'utf-8');
        const parsed = JSON.parse(data);
        Object.entries(parsed).forEach(([token, data]) => {
          this.tokens.set(token, data as TokenData);
        });
        console.log(`Loaded ${this.tokens.size} tokens from storage`);
      }
    } catch (error) {
      console.error('Error loading tokens:', error);
    }
  }

  private saveTokens() {
    try {
      const data: Record<string, TokenData> = {};
      this.tokens.forEach((value, key) => {
        data[key] = value;
      });
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error saving tokens:', error);
    }
  }

  set(token: string, apiKey: string) {
    const data: TokenData = {
      synthApiKey: apiKey,
      createdAt: new Date().toISOString(),
      lastUsed: new Date().toISOString()
    };
    this.tokens.set(token, data);
    this.saveTokens();
  }

  get(token: string): { synthApiKey: string; createdAt: Date; lastUsed: Date } | undefined {
    const data = this.tokens.get(token);
    if (!data) return undefined;
    
    // Update last used
    data.lastUsed = new Date().toISOString();
    this.saveTokens();
    
    return {
      synthApiKey: data.synthApiKey,
      createdAt: new Date(data.createdAt),
      lastUsed: new Date(data.lastUsed)
    };
  }

  size(): number {
    return this.tokens.size;
  }

  cleanup(daysOld: number = 30) {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - daysOld);
    
    let removed = 0;
    this.tokens.forEach((data, token) => {
      if (new Date(data.createdAt) < cutoff) {
        this.tokens.delete(token);
        removed++;
      }
    });
    
    if (removed > 0) {
      this.saveTokens();
      console.log(`Cleaned up ${removed} old tokens`);
    }
  }
}

export const tokenStore = new TokenStore();