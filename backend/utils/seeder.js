import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

dotenv.config();
connectDB();

const users = [
  { name: "Admin User", email: "admin@myzon.com", password: "admin123", role: "admin" },
  { name: "John Doe", email: "john@myzon.com", password: "john123", role: "user" },
  { name: "Jane Smith", email: "jane@myzon.com", password: "jane123", role: "user" },
];

const products = [
  {
    name: "Apple iPhone 15 Pro",
    description: "The most powerful iPhone ever with A17 Pro chip, titanium design, and a 48MP camera system.",
    richDescription: "Experience the future of smartphones with ProMotion display and Action Button.",
    images: ["https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600"],
    brand: "Apple",
    category: "Electronics",
    price: 134900,
    discountPrice: 124999,
    countInStock: 25,
    isFeatured: true,
    rating: 4.8,
    numReviews: 12,
    tags: ["iphone", "apple", "smartphone", "5g"],
    specifications: [
      { key: "Chip", value: "A17 Pro" },
      { key: "Display", value: "6.1-inch Super Retina XDR" },
      { key: "Camera", value: "48MP Main + 12MP Ultra Wide + 12MP Telephoto" },
      { key: "Battery", value: "Up to 23 hours" },
    ],
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description: "Galaxy AI is here — with built-in S Pen and 200MP camera for epic shots.",
    images: ["https://images.unsplash.com/photo-1706016034117-1f4bbd58e21d?w=600"],
    brand: "Samsung",
    category: "Electronics",
    price: 129999,
    discountPrice: 119999,
    countInStock: 18,
    isFeatured: true,
    rating: 4.7,
    numReviews: 9,
    tags: ["samsung", "galaxy", "android", "5g"],
    specifications: [
      { key: "Chip", value: "Snapdragon 8 Gen 3" },
      { key: "Camera", value: "200MP Main" },
      { key: "S Pen", value: "Built-in" },
    ],
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    description: "Industry-leading noise cancellation with exceptional sound quality.",
    images: ["https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600"],
    brand: "Sony",
    category: "Electronics",
    price: 34990,
    discountPrice: 28999,
    countInStock: 40,
    isFeatured: true,
    rating: 4.9,
    numReviews: 24,
    tags: ["headphones", "sony", "noise-cancelling", "wireless"],
    specifications: [
      { key: "Battery Life", value: "30 hours" },
      { key: "Noise Cancellation", value: "Industry Leading" },
      { key: "Weight", value: "250g" },
    ],
  },
  {
    name: "Nike Air Max 270",
    description: "Inspired by two icons of big Air, the Nike Air Max 270 features Nike's biggest heel Air unit yet.",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"],
    brand: "Nike",
    category: "Footwear",
    price: 12995,
    discountPrice: 9999,
    countInStock: 60,
    isFeatured: true,
    rating: 4.6,
    numReviews: 31,
    tags: ["nike", "shoes", "running", "airmax"],
  },
  {
    name: "Levi's 511 Slim Jeans",
    description: "Classic slim fit jeans crafted from stretch denim for all-day comfort.",
    images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=600"],
    brand: "Levi's",
    category: "Clothing",
    price: 4999,
    discountPrice: 3499,
    countInStock: 100,
    isFeatured: false,
    rating: 4.4,
    numReviews: 18,
    tags: ["levis", "jeans", "denim", "slim"],
  },
  {
    name: "MacBook Air M3",
    description: "Incredibly thin and light. M3 chip with 18-hour battery life and Liquid Retina display.",
    images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600"],
    brand: "Apple",
    category: "Electronics",
    price: 114900,
    discountPrice: 109900,
    countInStock: 15,
    isFeatured: true,
    rating: 4.9,
    numReviews: 7,
    tags: ["macbook", "apple", "laptop", "m3"],
    specifications: [
      { key: "Chip", value: "Apple M3" },
      { key: "RAM", value: "8GB / 16GB" },
      { key: "Display", value: "13.6-inch Liquid Retina" },
    ],
  },
  {
    name: "Instant Pot Duo 7-in-1",
    description: "7-in-1 multi-cooker: Pressure Cooker, Slow Cooker, Rice Cooker, Steamer, Sauté, Yogurt Maker, Warmer.",
    images: ["https://images.unsplash.com/photo-1585515320310-259814833e62?w=600"],
    brand: "Instant Pot",
    category: "Home & Kitchen",
    price: 8999,
    discountPrice: 6499,
    countInStock: 35,
    isFeatured: false,
    rating: 4.7,
    numReviews: 42,
    tags: ["kitchen", "cooker", "instant-pot"],
  },
  {
    name: "Atomic Habits by James Clear",
    description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones. #1 New York Times bestseller.",
    images: ["https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600"],
    brand: "Penguin",
    category: "Books",
    price: 799,
    discountPrice: 499,
    countInStock: 200,
    isFeatured: false,
    rating: 4.8,
    numReviews: 95,
    tags: ["books", "self-help", "habits"],
  },
  {
    name: "Apple Watch Series 10",
    description: "The most advanced Apple Watch yet with a brighter display and advanced health tracking.",
    richDescription: "Monitor your health, stay connected, and track your workouts with the new Series 10.",
    images: ["https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600"],
    brand: "Apple",
    category: "Electronics",
    price: 39900,
    discountPrice: 37900,
    countInStock: 50,
    isFeatured: true,
    rating: 4.9,
    numReviews: 120,
    tags: ["apple", "watch", "smartwatch", "wearable"],
    specifications: [
      { key: "Display", value: "Always-On Retina" },
      { key: "Battery", value: "Up to 18 hours" },
    ],
  },
  {
    name: "Ray-Ban Meta Smart Glasses",
    description: "Iconic Ray-Ban style with built-in camera, open-ear audio, and Meta AI.",
    images: ["https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600"],
    brand: "Meta",
    category: "Electronics",
    price: 29900,
    discountPrice: 28900,
    countInStock: 30,
    isFeatured: true,
    rating: 4.6,
    numReviews: 45,
    tags: ["meta", "ray-ban", "smart glasses", "wearable"],
  },
  {
    name: "Sony WF-1000XM5 Earbuds",
    description: "The best truly wireless noise canceling earbuds from Sony.",
    images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600"],
    brand: "Sony",
    category: "Electronics",
    price: 24900,
    discountPrice: 21900,
    countInStock: 60,
    isFeatured: true,
    rating: 4.8,
    numReviews: 85,
    tags: ["sony", "earbuds", "audio", "noise-canceling"],
  },
  {
    name: "DJI Osmo Pocket 3",
    description: "Compact 3-axis gimbal camera for content creators with a 1-inch CMOS sensor.",
    images: ["https://images.unsplash.com/photo-1502982720700-baf979f21f39?w=600"],
    brand: "DJI",
    category: "Electronics",
    price: 45900,
    discountPrice: 43900,
    countInStock: 25,
    isFeatured: false,
    rating: 4.9,
    numReviews: 60,
    tags: ["dji", "camera", "vlogging", "gimbal"],
  },
  {
    name: "Amazon Fire TV Stick 4K Max",
    description: "The most powerful streaming stick with Wi-Fi 6E support and ambient experience.",
    images: ["https://images.unsplash.com/photo-1540829016269-e05670f88adb?w=600"],
    brand: "Amazon",
    category: "Electronics",
    price: 5990,
    discountPrice: 4490,
    countInStock: 150,
    isFeatured: false,
    rating: 4.7,
    numReviews: 320,
    tags: ["amazon", "streaming", "fire-tv", "4k"],
  },
];

import slugify from "slugify";

const importData = async () => {
  try {
    await Order.deleteMany();
    await Cart.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    const createdUsers = await User.insertMany(users);
    console.log(`✅ ${createdUsers.length} users seeded`);
    
    const productsWithSlugs = products.map(p => ({
      ...p,
      slug: slugify(p.name, { lower: true, strict: true })
    }));
    const createdProducts = await Product.insertMany(productsWithSlugs);
    console.log(`✅ ${createdProducts.length} products seeded`);
    console.log("🎉 Data imported successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeder error:", err.message);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Cart.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("🗑️  Data destroyed");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") destroyData();
else importData();
