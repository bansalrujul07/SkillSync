import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createServiceRequest,
  getIncomingRequests,
  updateRequestStatus,
} from "../controllers/serviceRequestController.js";

const router = express.Router();

router.use(protect);

router.get("/", getIncomingRequests);
router.post("/:serviceId", createServiceRequest);
router.patch("/:requestId/status", updateRequestStatus);

export default router;