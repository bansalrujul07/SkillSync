import express from "express";
import {createService,getServices,getMyServices, getServiceById} from "../controllers/serviceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getServices);
router.get("/mine", protect, getMyServices);
router.post("/", protect, createService);
router.get("/:id", getServiceById)

export default router;
