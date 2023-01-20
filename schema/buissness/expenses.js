const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    buissnessExpense: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "buissnessExpense",
      required: true,
    },
    expenseName: {
      type: String,
      require: true,
    },
    expenseDescription: {
      type: String,
      required: true,
      default: "None",
    },
    expensetype: {
      type: String,
      require: true,
      default: "CR",
    },
    expenseOnType: {
      type: String,
      require: true,
      default: "None",
    },
    expenseOn: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "buissnessCustomers",
    },
    expenseAmount: {
      count: {
        type: Number,
        require: true,
      },
      curency: {
        type: String,
        require: true,
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
