const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    typeName: {
      type: String,
      required: true,
      default: "End User",
    },
    rights: [
      {
        type: String,
        required: true,
      }
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userprofile",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("usertype", UserSchema);
