import { ApiError } from "../utils/ApiError.js";

/**
 * Zod validation middleware factory.
 * Usage: router.post("/signup", validate(signupSchema), signup)
 */
export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const errorList = result.error.issues || result.error.errors || [];
    const errors = errorList.map ? errorList.map((e) => e.message) : ["Validation failed"];
    throw ApiError.badRequest("Validation failed", errors);
  }
  req.body = result.data; // Use the parsed/sanitized data
  next();
};
