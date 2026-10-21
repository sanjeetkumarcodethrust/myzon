import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  cancelOrder,
  resendDeliveryOtp,
  verifyDeliveryOtp,
} from "../controllers/orderController.js";
import { protect, optionalProtect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", optionalProtect, createOrder);
router.post("/resend-delivery-otp", resendDeliveryOtp);
router.post("/verify-delivery-otp", verifyDeliveryOtp);
router.get("/myorders", protect, getMyOrders);
router.get("/:id", optionalProtect, getOrderById);
router.put("/:id/pay", protect, updateOrderToPaid);
router.put("/:id/cancel", protect, cancelOrder);

export default router;
