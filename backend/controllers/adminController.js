import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getDashboardStats = asyncHandler(async (req, res) => {
  const [totalUsers, totalProducts, totalOrders, revenueResult, recentOrders, lowStock] =
    await Promise.all([
      User.countDocuments({ role: "user" }),
      Product.countDocuments(),
      Order.countDocuments(),
      Order.aggregate([
        { $match: { isPaid: true } },
        { $group: { _id: null, total: { $sum: "$totalPrice" } } },
      ]),
      Order.find().populate("user", "name email").sort("-createdAt").limit(5),
      Product.find({ countInStock: { $lt: 10 } }).select("name countInStock").limit(5),
    ]);

  res.json({
    success: true,
    data: {
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue: revenueResult[0]?.total || 0,
      recentOrders,
      lowStock,
    },
  });
});

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").sort("-createdAt");
  res.json({ success: true, data: users });
});

// @desc    Update user role / status
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) { res.status(404); throw new Error("User not found"); }
  user.role = req.body.role || user.role;
  user.isActive = req.body.isActive !== undefined ? req.body.isActive : user.isActive;
  const updated = await user.save();
  res.json({ success: true, data: { ...updated._doc, password: undefined } });
});

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) { res.status(404); throw new Error("User not found"); }
  res.json({ success: true, message: "User deleted" });
});

// @desc    Get all orders (admin)
// @route   GET /api/admin/orders
// @access  Private/Admin
export const getAllOrders = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 15;
  const skip = (page - 1) * limit;
  const total = await Order.countDocuments();
  const orders = await Order.find()
    .populate("user", "name email")
    .sort("-createdAt")
    .skip(skip)
    .limit(limit);
  res.json({ success: true, data: orders, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
});

// @desc    Update order status (admin)
// @route   PUT /api/admin/orders/:id
// @access  Private/Admin
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) { res.status(404); throw new Error("Order not found"); }
  order.status = req.body.status || order.status;
  if (req.body.status === "Delivered") { order.isDelivered = true; order.deliveredAt = Date.now(); }
  if (req.body.trackingNumber) order.trackingNumber = req.body.trackingNumber;
  const updated = await order.save();
  res.json({ success: true, data: updated });
});
