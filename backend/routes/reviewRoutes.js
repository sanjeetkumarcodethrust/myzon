import express from "express";
import { createReview, deleteReview } from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:productId", protect, createReview);
router.delete("/:productId/:reviewId", protect, deleteReview);

export default router;
