const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    buissness: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "buissness",
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
      ref: "userprofile",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("buissnessustomer", UserSchema);
