import MenuItem from "./items.js";
import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    orderItems: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "MenuItem",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
        },
        totalSubPrice: {
          type: Number,
        },
      },
    ],
    totalPrice: {
      type: Number,
      // required: true,
      default: 0,
    },
    orderNumber: {
      type: String,
      unique: true,
      default: () =>
        `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "paymob"],
      default: "cash",
    },
    //  or   orderNumber: {
    //   type: Number,
    //   unique: true
    // }
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

orderSchema.pre("save", async function (next) {
  try {
    for (const item of this.orderItems) {
      if (!item.price || !item.totalSubPrice) {
        const menuItem = await MenuItem.findById(item.itemId);
        if (!menuItem) {
          console.warn(`MenuItem with id ${item.itemId} not found, skipping`);
          throw new Error(`MenuItem with id ${item.itemId} not found`);
          // continue; // Skip this item instead of failing entire order
        }
        item.price = menuItem.price;
        item.totalSubPrice = item.price * item.quantity;
      }
    }

    this.totalPrice = this.orderItems.reduce(
      (acc, item) => acc + item.totalSubPrice,
      0
    );
    next();
  } catch (err) {
    console.error("Error in pre-save hook:", err);
    next(err);
  }
});

export default mongoose.model("order", orderSchema);
