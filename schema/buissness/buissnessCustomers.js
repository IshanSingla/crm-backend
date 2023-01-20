const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    buissnessExpense: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "buissnessExpense",
      required: true,
    },
    customer: {
      customerName: {
        type: String,
        required: true,
      },
      customerEmail: {
        type: String,
      },
      customerPhoneNumber: {
        type: String,
      },
      customerAddress: {
        type: String,
      },
    },
    buissness: {
      buissnessName: {
        type: String,
        required: true,
      },
      buissnessEmail: {
        type: String,
      },
      buissnessPhoneNumber: {
        type: String,
      },
      buissnessAddress: {
        type: String,
      },
      buissnessGstIn: {
        type: String,
      },
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userProfile",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("buissnessCustomers", UserSchema);
