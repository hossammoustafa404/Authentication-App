import * as express from "express";
import {
  forgetPassword,
  login,
  logout,
  refreshToken,
  register,
  resetPassword,
  sendVerifyEmail,
  verifyEmail,
} from "../controllers/auth";
import validate from "../middlewares/validate";
import { createUserValidator } from "../validators/users";
import { loginValidator } from "../validators/auth";
import { protect } from "../middlewares/passport";
import { authenticate } from "../middlewares/passport";

const router = express.Router();

// Register Route
router.route("/register").post(validate(createUserValidator), register);

// Login Route
router.route("/login").post(validate(loginValidator), authenticate(), login);

// Refresh Token Route
router.route("/refresh").get(refreshToken);

// Logout Route
router.route("/logout").delete(protect(), logout);

// Verfiy Email Route
router.patch("/verify-email/:verifyToken", verifyEmail);

// Send Verify Email Route
router.get("/send-verify-email", protect(), sendVerifyEmail);

// Forget Password Route
router.get("/forget-password", forgetPassword);

// Reset Password Route
router.patch("/reset-password/:resetToken", resetPassword);

export default router;
