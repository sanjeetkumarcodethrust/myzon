import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import User from "../models/User.js";
import { generateDeliveryOtp, sendDeliveryOtpSms, sanitizePhone } from "../utils/otpService.js";

// @desc    Create order & dispatch real Delivery OTP SMS
// @route   POST /api/orders
// @access  Public / Optional Auth
export const createOrder = asyncHandler(async (req, res) => {
  const {
    id: customId,
    orderId: reqOrderId,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    deliveryOtp: customOtp,
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items in payload");
  }

  // 1. Order ID & Secure 4-Digit Delivery OTP
  const orderId = customId || reqOrderId || `MZ-${Math.floor(100000 + Math.random() * 900000)}`;
  const deliveryOtp = customOtp || generateDeliveryOtp();

  // 2. Identify or auto-create customer account by phone
  let userId = req.user?._id;
  if (!userId && shippingAddress?.phone) {
    const cleanPhone = sanitizePhone(shippingAddress.phone);
    if (cleanPhone) {
      let customer = await User.findOne({ phone: cleanPhone });
      if (!customer) {
        customer = await User.create({
          name: shippingAddress.name || "Customer",
          phone: cleanPhone,
          email: `${cleanPhone}@customer.myzon.in`,
          role: "user",
        });
      }
      userId = customer._id;
    }
  }

  // 3. Format items safely for Mongoose
  const safeItems = orderItems.map((item) => ({
    name: item.title || item.name || "Product",
    image: item.image || (item.images && item.images[0]) || "",
    price: Number(item.price) || 0,
    quantity: Number(item.qty || item.quantity) || 1,
    product: mongoose.isValidObjectId(item.id || item.product)
      ? item.id || item.product
      : new mongoose.Types.ObjectId(),
  }));

  const order = new Order({
    user: userId || undefined,
    customOrderId: orderId,
    orderItems: safeItems,
    shippingAddress: {
      name: shippingAddress?.name || "",
      street: shippingAddress?.street || shippingAddress?.address || "",
      address: shippingAddress?.address || shippingAddress?.street || "",
      city: shippingAddress?.city || "",
      state: shippingAddress?.state || "",
      zip: shippingAddress?.zip || shippingAddress?.pincode || "",
      pincode: shippingAddress?.pincode || shippingAddress?.zip || "",
      country: shippingAddress?.country || "India",
      phone: shippingAddress?.phone || "",
    },
    paymentMethod: paymentMethod || "COD",
    itemsPrice: Number(itemsPrice) || Number(totalPrice) || 0,
    shippingPrice: Number(shippingPrice) || 0,
    taxPrice: Number(taxPrice) || 0,
    totalPrice: Number(totalPrice) || 0,
    deliveryOtp,
    status: "Processing",
    trackingNumber: `AWB${orderId.replace(/\D/g, "") || Math.floor(1000000000 + Math.random() * 9000000000)}`,
  });

  const created = await order.save();

  // 4. Clear cart if user is authenticated
  if (userId) {
    try {
      await Cart.findOneAndUpdate({ user: userId }, { items: [], discount: 0 });
    } catch (e) {
      // ignore cart clear error
    }
  }

  // 5. Dispatch Real Delivery OTP SMS to Customer's phone
  let smsResult = null;
  const targetPhone = shippingAddress?.phone;
  if (targetPhone) {
    try {
      smsResult = await sendDeliveryOtpSms({
        phone: targetPhone,
        orderId,
        deliveryOtp,
        totalAmount: totalPrice,
      });
    } catch (err) {
      console.warn("⚠️ Could not send Delivery OTP SMS:", err.message);
      smsResult = { success: false, error: err.message };
    }
  }

  res.status(201).json({
    success: true,
    data: created,
    orderId,
    deliveryOtp,
    smsResult,
    message: `Order #${orderId} confirmed successfully with Secure Delivery OTP.`,
  });
});

// @desc    Resend Doorstep Delivery OTP via Real SMS
// @route   POST /api/orders/resend-delivery-otp
// @access  Public / Optional Auth
export const resendDeliveryOtp = asyncHandler(async (req, res) => {
  const { orderId, phone, deliveryOtp: providedOtp } = req.body;
  if (!orderId || !phone) {
    res.status(400);
    throw new Error("orderId and phone are required");
  }

  let otp = providedOtp;
  if (!otp) {
    const isObjectId = mongoose.isValidObjectId(orderId);
    const order = await Order.findOne({
      $or: [{ customOrderId: orderId }, ...(isObjectId ? [{ _id: orderId }] : [])],
    });
    if (order && order.deliveryOtp) {
      otp = order.deliveryOtp;
    } else {
      otp = generateDeliveryOtp();
      if (order) {
        order.deliveryOtp = otp;
        await order.save();
      }
    }
  }

  const result = await sendDeliveryOtpSms({
    phone,
    orderId,
    deliveryOtp: otp,
  });

  res.status(200).json({
    success: true,
    orderId,
    deliveryOtp: otp,
    smsResult: result,
    message: `Delivery OTP ${otp} resent to +91 ${phone} via SMS.`,
  });
});

// @desc    Verify Doorstep Delivery OTP
// @route   POST /api/orders/verify-delivery-otp
// @access  Public / Protected
export const verifyDeliveryOtp = asyncHandler(async (req, res) => {
  const { orderId, enteredOtp } = req.body;
  if (!orderId || !enteredOtp) {
    res.status(400);
    throw new Error("orderId and enteredOtp are required");
  }

  const isObjectId = mongoose.isValidObjectId(orderId);
  const order = await Order.findOne({
    $or: [{ customOrderId: orderId }, ...(isObjectId ? [{ _id: orderId }] : [])],
  });

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  if (order.deliveryOtp !== enteredOtp.toString().trim()) {
    res.status(400);
    throw new Error("Invalid Delivery OTP. Please enter the correct code received by the customer.");
  }

  order.deliveryOtpVerified = true;
  order.status = "Delivered";
  order.isDelivered = true;
  order.deliveredAt = Date.now();
  await order.save();

  res.status(200).json({
    success: true,
    data: order,
    message: "Delivery OTP verified successfully! Order marked as Delivered.",
  });
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

// @desc    Get order by ID (Supports MongoDB ID or custom MZ-XXXXXX)
// @route   GET /api/orders/:id
// @access  Public / Optional Auth
export const getOrderById = asyncHandler(async (req, res) => {
  const isObjectId = mongoose.isValidObjectId(req.params.id);
  const order = await Order.findOne({
    $or: [{ customOrderId: req.params.id }, ...(isObjectId ? [{ _id: req.params.id }] : [])],
  }).populate("user", "name email phone");

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  res.json({ success: true, data: order });
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
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
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  if (order.status === "Shipped" || order.status === "Delivered") {
    res.status(400);
    throw new Error("Cannot cancel this order");
  }
  order.status = "Cancelled";
  await order.save();
  res.json({ success: true, data: order });
});
