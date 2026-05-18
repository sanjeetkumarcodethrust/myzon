import asyncHandler from "express-async-handler";
import User from "../models/User.js";

// @desc    Get wishlist
// @route   GET /api/wishlist
// @access  Private
export const getWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("wishlist", "name images price discountPrice rating numReviews countInStock category brand");
  res.json({ success: true, data: user.wishlist });
});

// @desc    Toggle wishlist item
// @route   POST /api/wishlist/:productId
// @access  Private
export const toggleWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { productId } = req.params;
  const index = user.wishlist.findIndex((id) => id.toString() === productId);
  let action;
  if (index >= 0) {
    user.wishlist.splice(index, 1);
    action = "removed";
  } else {
    user.wishlist.push(productId);
    action = "added";
  }
  await user.save();
  res.json({ success: true, action, wishlist: user.wishlist });
});
