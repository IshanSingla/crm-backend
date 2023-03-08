const mongoose = require("mongoose");
const buissnessSchema = mongoose.Schema(
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
          default: "None",
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
    buissnessLogo: {
      type: String,
      default: "None",
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userprofile",
        required: true,
      },
    ],
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "buissnessrole",
        required: true,
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
module.exports = mongoose.model("buissness", buissnessSchema);
