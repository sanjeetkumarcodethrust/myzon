import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.Mixed, required: false },
  name: { type: String, required: true },
  image: { type: String, required: false, default: "" },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1, default: 1 },
});

const shippingAddressSchema = new mongoose.Schema({
  name: String,
  label: String,
  street: { type: String, required: false },
  address: { type: String, required: false },
  city: { type: String, required: true },
  state: { type: String, required: false, default: "" },
  zip: { type: String, required: false },
  pincode: { type: String, required: false },
  country: { type: String, required: true, default: "India" },
  phone: { type: String, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    customOrderId: { type: String, default: "" },
    orderItems: [orderItemSchema],
    shippingAddress: shippingAddressSchema,
    paymentMethod: {
      type: String,
      required: true,
      default: "COD",
    },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    itemsPrice: { type: Number, required: true, default: 0 },
    shippingPrice: { type: Number, required: true, default: 0 },
    taxPrice: { type: Number, required: true, default: 0 },
    totalPrice: { type: Number, required: true, default: 0 },
    deliveryOtp: { type: String, default: "" },
    deliveryOtpVerified: { type: Boolean, default: false },
    isPaid: { type: Boolean, default: false },
    paidAt: Date,
    isDelivered: { type: Boolean, default: false },
    deliveredAt: Date,
    status: {
      type: String,
      default: "Pending",
    },
    trackingNumber: { type: String, default: "" },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
