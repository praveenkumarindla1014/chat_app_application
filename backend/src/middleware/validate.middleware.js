import { ApiError } from "../utils/ApiError.js";

/**
 * Zod validation middleware factory.
 * Usage: router.post("/signup", validate(signupSchema), signup)
 */
export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const errorList = result.error?.issues ?? result.error?.errors ?? result.error?.flatten?.()?.formErrors ?? [];
    const errors = Array.isArray(errorList) && errorList.length > 0
      ? errorList.map((e) => (typeof e === "string" ? e : e.message))
      : [result.error?.message || "Validation failed"];
    throw ApiError.badRequest("Validation failed", errors);
  }
  req.body = result.data; // Use the parsed/sanitized data
  next();
};
