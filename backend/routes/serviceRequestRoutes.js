import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createServiceRequest, getIncomingRequests, updateRequestStatus } from "../controllers/serviceRequestController.js";

const router = express.Router();

router.post("/:serviceId", protect, createServiceRequest);
router.get("/incoming", protect, getIncomingRequests);
router.patch("/:requestId/status", protect, updateRequestStatus);

export default router;