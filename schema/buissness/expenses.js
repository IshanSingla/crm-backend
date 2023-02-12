const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    buissnessExpense: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "buissnessExpense",
      required: true,
    },
    expenseName: {
      type: String,
      required: true,
    },
    expenseDescription: {
      type: String,
      required: true,
      default: "None",
    },
    expensetype: {
      type: String,
      required: true,
      default: "CR",
    },
    expenseOnType: {
      type: String,
      required: true,
      default: "None",
    },
    expenseOn: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "buissnessCustomers",
    },
    expenseAmount: {
      count: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        required: true,
        default: "INR",
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userProfile",
      required: true,
    },
  },
  { timestamps: true, strict: false }
);
module.exports = mongoose.model("expenses", UserSchema);
