const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    buissness: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "buissness",
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
      ref: "buissnesscustomer",
    },
    expenseAmount: {
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
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userprofile",
      required: true,
    },
  },
  { timestamps: true, strict: false }
);
module.exports = mongoose.model("expense", UserSchema);
