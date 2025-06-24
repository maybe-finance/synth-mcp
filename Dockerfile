FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source files
COPY . .

# Build the TypeScript project
RUN npm run build

# Expose the port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]