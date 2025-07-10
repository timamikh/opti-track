# Build stage
FROM node:20-alpine as build

WORKDIR /app

# Add non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY package.json ./
COPY package-lock.json ./

# Install dependencies with exact versions
RUN npm ci

COPY . .

# Build with production optimization
RUN npm run build

# Production stage
FROM nginx:alpine

# Add non-root user
RUN addgroup -S nginxgroup && adduser -S nginxuser -G nginxgroup

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Set correct permissions
RUN chown -R nginxuser:nginxgroup /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chown -R nginxuser:nginxgroup /var/cache/nginx && \
    chown -R nginxuser:nginxgroup /var/log/nginx && \
    chown -R nginxuser:nginxgroup /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginxuser:nginxgroup /var/run/nginx.pid

# Switch to non-root user
USER nginxuser

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 