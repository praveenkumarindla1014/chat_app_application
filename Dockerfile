FROM node:20-alpine

WORKDIR /app

COPY backend/package*.json ./

RUN npm ci --only=production

COPY backend/src/ ./src/

EXPOSE 5002

CMD ["node", "src/index.js"]
