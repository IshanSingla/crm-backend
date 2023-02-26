const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    buissness: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "buissness",
      required: true,
    },
    inventoryName: {
      type: String,
      required: true,
    },
    inventoryDescription: {
      type: String,
      required: true,
      default: "None",
    },
    inventoryCost: {
      sellingPrice: {
        type: Number,
        default: 0,
      },
      buyingPrice: {
        type: Number,
        default: 0,
      },
      currency: {
        type: String,
        default: "INR",
      },
    },
    inventoryQuantity: {
        type: Number,
        default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userprofile",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("inventory", UserSchema);
