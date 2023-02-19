const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    expenses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "expenses",
      },
    ],
    buissnessName: {
      type: String,
      required: true,
    },
    buissnessGstNo: {
      type: String,
    },
    buissnessAddress: {
      sNo: String,
      address: String,
      district: String,
      city: String,
      state: String,
      region: String,
      pin: String,
      country: String,
      directions: String,
    },
    buissnessCustomers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "buissnessCustomers",
      },
    ],
    buissnessExpensesTypes: [
      {
        type: String,
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userProfile",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("buissnessExpense", UserSchema);
