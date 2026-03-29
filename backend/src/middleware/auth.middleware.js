import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const protectRoute = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw ApiError.unauthorized("Unauthorized - No token provided");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.userId).select("-password");

  if (!user) {
    throw ApiError.unauthorized("Unauthorized - User not found");
  }

  req.user = user;
  next();
});