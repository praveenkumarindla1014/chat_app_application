import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import helmet from "helmet";
import morgan from "morgan";
import mongoSanitize from "express-mongo-sanitize";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { apiLimiter, authLimiter } from "./middleware/rateLimit.middleware.js";
import logger from "./utils/logger.js";


const PORT = process.env.PORT || 5002;
const __dirname = path.resolve();

// ─── Trust Proxy (Required for Rate Limiting on Render) ────
app.set("trust proxy", 1);

// ─── Security Middleware ──────────────────────────────────
app.use(helmet());
app.use(mongoSanitize()); // Prevent NoSQL injection

// ─── Request Parsing ──────────────────────────────────────
app.use(express.json({ limit: "50mb" })); // Allow large image uploads
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// ─── Logging ──────────────────────────────────────────────
app.use(morgan("dev"));

// ─── CORS ─────────────────────────────────────────────────
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL || "http://localhost:5174",
      "http://localhost:5173",
      "http://localhost:5175",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:5174",
      "https://chat-app-application-1.onrender.com"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ─── Rate Limiting ────────────────────────────────────────
app.use("/api/", apiLimiter);
app.use("/api/auth", authLimiter);

// ─── Health Check (always available at /api/health) ───────
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Chat App API is running" });
});

// ─── API Routes ───────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// ─── Production Static Files ──────────────────────────────
if (process.env.NODE_ENV === "production") {
  const frontendDist = path.join(__dirname, "frontend", "dist");

  app.use(express.static(frontendDist));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendDist, "index.html"));
  });
}

// ─── Centralized Error Handler (must be last) ─────────────
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────
server.listen(PORT, () => {
  logger.info(`Server is running on PORT: ${PORT}`);
  connectDB();
});
