const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    expenses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "expense",
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
        ref: "buissnesscustomer",
      },
    ],
    buissnessExpensesTypes: [
      {
        type: String,
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userprofile",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("buissnessexpense", UserSchema);
