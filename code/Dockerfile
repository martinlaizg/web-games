# syntax=docker/dockerfile:1

FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS backend-builder
WORKDIR /app/server
COPY server/package.json server/package-lock.json ./
RUN npm ci
COPY server .
RUN npm run build

FROM node:20-alpine AS app
WORKDIR /app
ENV NODE_ENV=production
RUN apk add --no-cache nginx
COPY server/package.json server/package-lock.json ./
RUN npm ci --omit=dev
COPY --from=backend-builder /app/server/dist ./dist
COPY --from=frontend-builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/http.d/default.conf
COPY docker-entrypoint.sh /usr/local/bin/web-games
RUN chmod +x /usr/local/bin/web-games
EXPOSE 80
CMD ["web-games"]
