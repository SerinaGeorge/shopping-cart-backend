const  mongoose  = require('mongoose');

const productSchema  =new mongoose.Schema({
    productId: Number,
    productName: String,
    productWeight: String,
    productWeightMetrics: String,
    productHeight: String,
    productHeightMetrics: String,
    productColors: [String],
    productDescription: String,
    sellerId:String
})


module.exports = mongoose.model('Product', productSchema);