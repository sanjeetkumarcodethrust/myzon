import express from "express";
import { register, login, getProfile, updateProfile, addAddress, deleteAddress } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.post("/address", protect, addAddress);
router.delete("/address/:id", protect, deleteAddress);

export default router;
