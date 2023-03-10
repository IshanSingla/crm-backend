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
        user: {
          type: String,
          required: true,
          
        },
        role: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "role",
          default: "63ca92f13ec1a3d50bdeb75b",
        },
        email: {
          type: String,
          required: true,
        },
        roleName: {
          type: String,
          required: true,
          default: "Owner",
        },
      },
    ],

    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("buissness", buissnessSchema);
