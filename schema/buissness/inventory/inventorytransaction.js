const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    buissness: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "buissness",
      required: true,
    },
    inventory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "inventory",
      required: true,
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
    inventoryTransactionAmmount: {
      count: {
        type: Number,
        default: 0,
      },
      currency: {
        type: String,
        default: "INR",
      },
      type: {
        type: String,
        default: "CASH", // CASH, CARD, UPI, PAYTM, BHIM, NETBANKING, CHEQUE, CREDIT, DEBIT
      },
      transictionId: {
        type: String,
        default: "None",
      },
    },
    inventoryTransactionQuantity: {
      type: Number,
      required: true,
    },

    inventoryTransactionTime: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userprofile",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("inventorytransaction", UserSchema);
