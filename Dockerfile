# ── Stage 1: Build the Frontend ────────────────────────────
FROM node:20-alpine AS frontend-build

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install --legacy-peer-deps

COPY frontend/ .
RUN npm run build

# ── Stage 2: Production Backend + Built Frontend ──────────
FROM node:20-alpine

WORKDIR /app

# Install backend dependencies
COPY backend/package*.json ./
RUN npm ci --omit=dev

# Copy backend source
COPY backend/src/ ./src/

# Copy built frontend from Stage 1
COPY --from=frontend-build /app/frontend/dist ./frontend/dist

# Set production mode so Express serves the static files
ENV NODE_ENV=production

EXPOSE 5002

CMD ["node", "src/index.js"]
