import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// Middleware: allow all origins in development and local network
app.use(cors({
  origin: (origin, callback) => callback(null, true),
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// Instant health check and root routes for Render / Uptime monitors (responds in <5ms without blocking on DB)
app.get("/", (req, res) => res.status(200).send("Myzon Backend API is active and running"));
app.get("/health", (req, res) => res.status(200).json({ status: "ok", timestamp: new Date().toISOString() }));
app.get("/api", (req, res) => res.status(200).json({ message: "Myzon API is running..." }));

// Static frontend dist files (if built)
const distPath = path.resolve(__dirname, "../frontend/dist");
app.use(express.static(distPath));

// Ensure DB is connected before processing API requests (except send-otp which only needs SMS dispatch)
app.use("/api", async (req, res, next) => {
  if (req.originalUrl && req.originalUrl.includes("/auth/send-otp")) {
    connectDB().catch((err) => console.warn("Background DB connection warning:", err.message));
    return next();
  }

  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("DB connection error on API request:", err.message);
    res.status(503).json({
      success: false,
      message: "Database connection failed. Please ensure MongoDB Atlas Network Access allows 0.0.0.0/0.",
      error: err.message,
    });
  }
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/upload", uploadRoutes);

// Error Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Only listen if not imported as a serverless module (e.g. Vercel)
if (process.env.NODE_ENV !== "test" && !process.env.VERCEL) {
  connectDB().catch((err) => {
    console.warn("Initial DB connection warning:", err.message);
  });

  // Explicitly bind to 0.0.0.0 as required by Render, Railway, Docker, and Linux cloud hosts
  app.listen(PORT, "0.0.0.0", () =>
    console.log(`🚀 Server running on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || "development"} mode`)
  );
}

export default app;
