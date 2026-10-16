import express from "express";
import { getCurrentUser, loginUser, logout, registerUser } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser)
router.get("/me", protect, getCurrentUser)
router.post("/logout", logout)

export default router;