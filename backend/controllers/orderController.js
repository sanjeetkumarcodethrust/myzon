import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

// @desc    Create order
// @route   POST /api/orders
// @access  Private
export const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice } = req.body;
  if (!orderItems || orderItems.length === 0) {
    res.status(400); throw new Error("No order items");
  }
  const order = new Order({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  });
  const created = await order.save();
  // Clear cart after order
  await Cart.findOneAndUpdate({ user: req.user._id }, { items: [], discount: 0 });
  res.status(201).json({ success: true, data: created });
});

// @desc    Get logged-in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .populate("orderItems.product", "name images")
    .sort("-createdAt");
  res.json({ success: true, data: orders });
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name email")
    .populate("orderItems.product", "name images price");
  if (!order) { res.status(404); throw new Error("Order not found"); }
  if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    res.status(403); throw new Error("Not authorized");
  }
  res.json({ success: true, data: order });
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) { res.status(404); throw new Error("Order not found"); }
  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = req.body;
  order.status = "Processing";
  const updated = await order.save();
  res.json({ success: true, data: updated });
});

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
export const cancelOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) { res.status(404); throw new Error("Order not found"); }
  if (order.status === "Shipped" || order.status === "Delivered") {
    res.status(400); throw new Error("Cannot cancel this order");
  }
  order.status = "Cancelled";
  await order.save();
  res.json({ success: true, data: order });
});
