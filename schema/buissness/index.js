const mongoose = require("mongoose");
const cart = require("./cart");
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
        type: String,
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
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

buissnessSchema.post("save", async (err, doc) => {
  let data = new cart({
    business: doc._id,
    inventory: [],
    createdBy: doc.createdBy
  });

  await data.save();
})

module.exports = mongoose.model("buissness", buissnessSchema);
