const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    uid: {
      type: String,
    },
    email: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    photoUrl: {
      type: String,
      default: "",
    },
    userGender: {
      type: String,
      default: "Prefer not to say",
    },
    userDOB: {
      type: Date,
      default: Date.now,
    },
    phoneNumber: {
      code: {
        type: String,
        default: "91",
      },
      number: {
        type: String,
        default: "",
      },
    },
    userAddress: {
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
    userType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usertype",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("userprofile", UserSchema);
