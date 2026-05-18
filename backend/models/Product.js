import mongoose from "mongoose";
import slugify from "slugify";

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Product name required"], trim: true },
    slug: { type: String, unique: true },
    description: { type: String, required: [true, "Description required"] },
    richDescription: { type: String, default: "" },
    images: [{ type: String }],
    brand: { type: String, default: "" },
    category: {
      type: String,
      required: [true, "Category required"],
      enum: [
        "Electronics",
        "Clothing",
        "Footwear",
        "Home & Kitchen",
        "Books",
        "Toys",
        "Sports",
        "Beauty",
        "Grocery",
        "Automotive",
        "Jewelry",
        "Other",
      ],
    },
    price: { type: Number, required: [true, "Price required"], min: 0 },
    discountPrice: { type: Number, default: 0 },
    countInStock: { type: Number, required: true, min: 0, default: 0 },
    reviews: [reviewSchema],
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    tags: [{ type: String }],
    specifications: [{ key: String, value: String }],
  },
  { timestamps: true }
);

productSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const Product = mongoose.model("Product", productSchema);
export default Product;
