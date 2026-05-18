import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1, default: 1 },
  price: { type: Number, required: true },
});

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    items: [cartItemSchema],
    couponCode: { type: String, default: "" },
    discount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

cartSchema.virtual("totalPrice").get(function () {
  return this.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
