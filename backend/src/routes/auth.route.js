import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { signupSchema, loginSchema, updateProfileSchema } from "../validators/auth.validator.js";
import {
  login,
  logout,
  signup,
  updateProfile,
  checkAuth,
} from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);

router.put("/update-profile", protectRoute, validate(updateProfileSchema), updateProfile);
router.get("/check", protectRoute, checkAuth);

export default router;