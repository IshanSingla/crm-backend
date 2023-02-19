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
      count: {
        type: Number,
        required: true,
        default: 0,
      },
      currency: {
        type: String,
        default: "INR",
      },
    },
    inventoryQuantity: {
        type: Number,
        required: true,
        default: 0,
    },
    inventryTransaction: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "inventorytransaction",
        },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userprofile",
      required: true,
    },
  },
  { timestamps: true, strict: false }
);
module.exports = mongoose.model("inventory", UserSchema);
