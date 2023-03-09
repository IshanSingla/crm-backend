const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "buissness",
        required: true
    },
    inventory: [
        {
            inventory_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "inventory",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    createdBy: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("cart", CartSchema);