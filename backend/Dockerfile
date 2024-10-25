# Menggunakan Node.js sebagai base image
FROM node:20

# Set working directory
WORKDIR /app

COPY package*.json ./

# Copy package.json dan package-lock.json

# Install dependencies
RUN pnpm install

COPY . .

# Expose port 3000 (atau sesuai dengan yang digunakan backend)
EXPOSE 3000

# Command untuk menjalankan server
CMD ["node", "server.js"]
