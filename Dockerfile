FROM node:22-bookworm-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts --no-audit --no-fund
COPY index.html vite.config.js ./
COPY scripts ./scripts
COPY public ./public
COPY shared ./shared
COPY src ./src
RUN npm run build

FROM node:22-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production HOST=0.0.0.0 PORT=4173 DB_PATH=/app/data/dosecheck.sqlite
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts --no-audit --no-fund
COPY --from=build /app/dist ./dist
COPY server ./server
COPY shared ./shared
COPY public ./public
RUN mkdir data && chown -R node:node /app
USER node
EXPOSE 4173
VOLUME ["/app/data"]
CMD ["npm", "start"]
