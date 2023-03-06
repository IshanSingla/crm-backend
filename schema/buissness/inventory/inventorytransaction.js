const mongoose = require("mongoose");
const inventoryTransactionSchema = mongoose.Schema(
  {
    inventory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "inventory",
        required: true,
      },
    ],
    inventoryTransactionAmmount: [
      {
        type: Number,
        required: true,
      },
    ],
    inventoryTransactionQuantity: [
      {
        type: Number,
        required: true,
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "userprofile",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model(
  "inventorytransaction",
  inventoryTransactionSchema
);
