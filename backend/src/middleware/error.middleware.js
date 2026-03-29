import logger from "../utils/logger.js";
import fs from "fs";

/**
 * Centralized error handling middleware.
 * Must be registered LAST in Express middleware chain.
 */
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : "Internal server error";

  logger.error(`${statusCode} - ${err.message} - ${req.method} ${req.originalUrl}`, {
    stack: err.stack,
  });

  try { fs.appendFileSync("error_dump.log", "\n====\n" + (err.stack || err.message) + "\n====\n"); } catch(e){}

  res.status(statusCode).json({
    success: false,
    message,
    ...(err.errors?.length && { errors: err.errors }),
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
