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
      },
    ],
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("buissnessrole", UserSchema);
