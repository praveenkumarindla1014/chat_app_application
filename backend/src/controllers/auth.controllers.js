import { authService } from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const signup = asyncHandler(async (req, res) => {
  const user = await authService.signup(req.body, res);
  res.status(201).json(user);
});

export const login = asyncHandler(async (req, res) => {
  const user = await authService.login(req.body, res);
  res.status(200).json(user);
});

export const logout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully" });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const updatedUser = await authService.updateProfile(req.user._id, req.body);
  res.status(200).json(updatedUser);
});

export const checkAuth = asyncHandler(async (req, res) => {
  const user = await authService.checkAuth(req.user);
  res.status(200).json(user);
});
