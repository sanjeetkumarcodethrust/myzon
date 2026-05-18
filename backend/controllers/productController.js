import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";

// @desc    Get all products with search, filter, sort, paginate
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  const query = {};

  if (req.query.search) {
    query.$or = [
      { name: { $regex: req.query.search, $options: "i" } },
      { description: { $regex: req.query.search, $options: "i" } },
      { brand: { $regex: req.query.search, $options: "i" } },
    ];
  }
  if (req.query.category) query.category = req.query.category;
  if (req.query.brand) query.brand = { $regex: req.query.brand, $options: "i" };
  if (req.query.minPrice || req.query.maxPrice) {
    query.price = {};
    if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
    if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
  }
  if (req.query.rating) query.rating = { $gte: Number(req.query.rating) };
  if (req.query.inStock === "true") query.countInStock = { $gt: 0 };
  if (req.query.featured === "true") query.isFeatured = true;

  let sort = {};
  switch (req.query.sort) {
    case "price_asc": sort = { price: 1 }; break;
    case "price_desc": sort = { price: -1 }; break;
    case "rating": sort = { rating: -1 }; break;
    case "newest": sort = { createdAt: -1 }; break;
    default: sort = { createdAt: -1 };
  }

  const total = await Product.countDocuments(query);
  const products = await Product.find(query).sort(sort).skip(skip).limit(limit);

  res.json({
    success: true,
    data: products,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
});

// @desc    Get single product by id or slug
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findOne({
    $or: [
      { _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null },
      { slug: req.params.id },
    ],
  }).populate("reviews.user", "name avatar");

  if (!product) { res.status(404); throw new Error("Product not found"); }
  res.json({ success: true, data: product });
});

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
export const getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isFeatured: true }).limit(8);
  res.json({ success: true, data: products });
});

// @desc    Create product (Admin)
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({ ...req.body });
  const created = await product.save();
  res.status(201).json({ success: true, data: created });
});

// @desc    Update product (Admin)
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) { res.status(404); throw new Error("Product not found"); }
  Object.assign(product, req.body);
  const updated = await product.save();
  res.json({ success: true, data: updated });
});

// @desc    Delete product (Admin)
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) { res.status(404); throw new Error("Product not found"); }
  res.json({ success: true, message: "Product deleted" });
});

// @desc    Get all categories
// @route   GET /api/products/categories
// @access  Public
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Product.distinct("category");
  res.json({ success: true, data: categories });
});
