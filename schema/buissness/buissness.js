const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    buissnessName: {
      type: String,
      required: true,
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
    expenses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "expense",
      },
    ],
    inventory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "inventory",
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
module.exports = mongoose.model("buissness", UserSchema);
