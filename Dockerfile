FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy source files
COPY . .

# Build the TypeScript project
RUN npm run build

# Remove dev dependencies after build
RUN npm prune --production

# Expose the port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]