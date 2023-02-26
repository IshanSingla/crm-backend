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
    buissnessContact: {
      email: {
        type: String,
        default: "None",
      },
      phone: {
        code: {
          type: String,
          default: "91",
        },
        number: {
          type: String,
          default: "",
        },
      },
    },
    buissnessGst: {
      type: String,
      default: "None",
    },
    buissnessPan: {
      type: String,
      default: "None",
    },
    buissnessType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "buissnesstype",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userprofile",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("buissness", UserSchema);
