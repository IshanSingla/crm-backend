const mongoose = require("mongoose");

const CartSchema = mongoose.Schema(
  {
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "buissness",
      required: true,
    },
    inventory: [
      {
        inventory_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "inventory",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        inventoryName: {
          type: String,
          required: true,
        },
        inventoryCost: {
          sellingPrice: {
            type: Number,
            default: 0,
            required: true,
          },
          buyingPrice: {
            type: Number,
            default: 0,
            required: true,
          },
          currency: {
            type: String,
            default: "INR",
            required: true,
          },
        },
      },
    ],
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("cart", CartSchema);
