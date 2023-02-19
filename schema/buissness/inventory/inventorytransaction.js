const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    buissness: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "buissness",
      required: true,
    },
    inventory: {
      type: String,
      required: true,
    },
    inventoryTransactionType: {
      type: String,
      required: true,
      default: "CR",
    },
    inventoryTransactionQuantity: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userprofile",
      required: true,
    },
  },
  { timestamps: true, strict: false }
);
module.exports = mongoose.model("inventorytransaction", UserSchema);
