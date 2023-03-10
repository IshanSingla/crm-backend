const mongoose = require("mongoose");
const inventoryTransactionSchema = mongoose.Schema(
  {
    inventory: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "inventory",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
      },
    ],
    inventoryTransactionTime: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    inventoryTransactionDetails: {
      type: String,
      default: "INVENTORY", // INVENTORY, CUSTOMER, SUPPLIER
    },
    inventoryTransactionType: {
      type: String,
      required: true,
      default: "SALE", // SALE PURCHASE RETURN
    },
    buissness: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "buissness",
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model(
  "inventorytransaction",
  inventoryTransactionSchema
);
