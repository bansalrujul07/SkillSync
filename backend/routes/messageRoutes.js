import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getMessages } from "../controllers/messageController.js";

const router = express.Router();

router.use(protect);

router.get("/:requestId", getMessages);

export default router;
