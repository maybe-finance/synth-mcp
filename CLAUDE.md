# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Run HTTP server in development mode (server.ts with SSEServerTransport)
- `npm run dev:local` - Run CLI server in development mode (index.ts with StdioServerTransport)
- `npm run build` - Compile TypeScript to JavaScript

### Production
- `npm start` - Run compiled HTTP server
- `npm run start:local` - Run compiled CLI server

### Important Notes
- No linting or test commands are currently configured
- Use `npm run build` before committing to ensure TypeScript compiles successfully

## Architecture

This is a Model Context Protocol (MCP) server that provides financial data tools through the Synth Finance API.

### Dual Transport Modes
1. **CLI Mode** (index.ts): Uses StdioServerTransport for local MCP clients
2. **HTTP Mode** (server.ts): Uses SSEServerTransport for web-based access with CORS

### Core Components
- **SynthClient** (synth-client.ts): Axios-based API wrapper for all Synth Finance endpoints
- **Tools** (src/tools/): Each financial feature is a self-contained tool module
- **Enhanced Descriptions** (enhanced-descriptions.ts): Extensive keyword mappings for natural language tool discovery

### Tool Pattern
Each tool follows this structure:
1. Exported from tools/index.ts
2. Implements standardized MCP tool interface
3. Uses SynthClient for API calls
4. Returns structured JSON responses
5. Includes comprehensive keyword descriptions for discovery

### API Authentication
- Bearer token passed via request headers (key: "Authorization")
- Server validates presence of API key before processing requests
- API key is never stored in code, always passed by client

### Error Handling
- Consistent error wrapping in tool responses
- API errors are caught and returned with descriptive messages
- Missing API key returns specific guidance