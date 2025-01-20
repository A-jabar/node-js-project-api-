const mongoose = require("mongoose");

const productschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: false
    },
    quantity: {
        type: Number,
        required: true
    },
},
{timestamps: true}
);

module.exports = mongoose.model("products", productschema);