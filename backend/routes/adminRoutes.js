import express from "express";
import {
  getDashboardStats,
  getAllUsers,
  updateUser,
  deleteUser,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/adminController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect, adminOnly);

router.get("/stats", getDashboardStats);
router.get("/users", getAllUsers);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.get("/orders", getAllOrders);
router.put("/orders/:id", updateOrderStatus);

export default router;
