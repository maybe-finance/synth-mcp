FROM node:18

WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm ci || npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]