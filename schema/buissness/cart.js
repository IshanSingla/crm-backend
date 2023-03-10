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
            },
            inventoryName: {
                type: String,
                required: true
            },
            inventoryCost: {
                sellingPrice: {
                    type: Number,
                    default: 0
                },
                buyingPrice: {
                    type: Number,
                    default: 0
                },
                currency: {
                    type: String,
                    default: "INR"
                },
            }
        }
    ],
    createdBy: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("cart", CartSchema);