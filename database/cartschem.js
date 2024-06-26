const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    productName:String,
    userId: String,
    productId:String,
    sellerId: String,
    quantity:  Number,
    created_date:  { type: Date, default: Date.now }
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;