FROM node:18

WORKDIR /app

# Copy everything
COPY . .

# Install dependencies
RUN npm install

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]