# Menggunakan Node.js sebagai base image
FROM node:20 AS build-stage

# Set working directory
WORKDIR /app

COPY package*.json ./

# Install dependencies

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine AS production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html
# Expose port 80 untuk akses aplikasi
EXPOSE 80

# Command untuk menjalankan aplikasi
CMD ["nginx", "-g", "daemon off;"]
