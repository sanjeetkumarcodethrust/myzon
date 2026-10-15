import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { sendOtp, verifyOtpCode, sanitizePhone } from "../utils/otpService.js";

// @desc    Send OTP to phone or email
// @route   POST /api/auth/send-otp
// @access  Public
export const sendOtpController = asyncHandler(async (req, res) => {
  const identifier = req.body.identifier || req.body.phone || req.body.email;
  if (!identifier || !identifier.trim()) {
    res.status(400);
    throw new Error("Phone number or email is required");
  }

  try {
    const result = await sendOtp(identifier.trim());
    res.status(200).json(result);
  } catch (error) {
    res.status(400);
    throw new Error(error.message || "Failed to dispatch verification code");
  }
});

// @desc    Verify OTP and log in / register
// @route   POST /api/auth/verify-otp
// @access  Public
export const verifyOtpController = asyncHandler(async (req, res) => {
  const { identifier, otp, name } = req.body;
  if (!identifier || !otp) {
    res.status(400);
    throw new Error("Identifier and OTP are required");
  }

  const check = verifyOtpCode(identifier, otp);
  if (!check.valid) {
    res.status(400);
    throw new Error(check.message);
  }

  const isPhone = !identifier.includes("@");
  const target = isPhone ? sanitizePhone(identifier) : identifier.trim().toLowerCase();

  // Find user by phone or email
  let user = null;
  if (isPhone) {
    user = await User.findOne({ phone: target });
  } else {
    user = await User.findOne({ email: target });
  }

  // Create new user if not found
  if (!user) {
    const displayName = name?.trim() || (isPhone ? `Client +91-${target.slice(-4)}` : target.split("@")[0]);
    user = await User.create({
      name: displayName,
      phone: isPhone ? target : "",
      email: !isPhone ? target : `${target}@myzon.in`,
      role: "user",
    });
  } else if (name && name.trim() && user.name.startsWith("Client +91-")) {
    user.name = name.trim();
    await user.save();
  }

  res.status(200).json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      avatar: user.avatar,
      token: generateToken(user._id),
    },
  });
});

// @desc    Register user (Traditional email/password)
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all fields");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({ name, email, password });
  res.status(201).json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      token: generateToken(user._id),
    },
  });
});

// @desc    Login user (Traditional email/password)
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  res.json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      token: generateToken(user._id),
    },
  });
});

// @desc    Get logged-in user profile
// @route   GET /api/auth/profile
// @access  Private
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) { res.status(404); throw new Error("User not found"); }
  res.json({ success: true, data: user });
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) { res.status(404); throw new Error("User not found"); }
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.phone = req.body.phone || user.phone;
  user.avatar = req.body.avatar || user.avatar;
  if (req.body.password) user.password = req.body.password;
  const updated = await user.save();
  res.json({
    success: true,
    data: {
      _id: updated._id,
      name: updated.name,
      email: updated.email,
      role: updated.role,
      avatar: updated.avatar,
      phone: updated.phone,
      token: generateToken(updated._id),
    },
  });
});

// @desc    Add / update address
// @route   POST /api/auth/address
// @access  Private
export const addAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) { res.status(404); throw new Error("User not found"); }
  if (req.body.isDefault) {
    user.addresses.forEach((a) => (a.isDefault = false));
  }
  user.addresses.push(req.body);
  await user.save();
  res.status(201).json({ success: true, data: user.addresses });
});

// @desc    Delete address
// @route   DELETE /api/auth/address/:id
// @access  Private
export const deleteAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  user.addresses = user.addresses.filter((a) => a._id.toString() !== req.params.id);
  await user.save();
  res.json({ success: true, data: user.addresses });
});
