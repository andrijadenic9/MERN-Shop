const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    img: { type: String },
    title: { type: String, required: Boolean },
    description: { type: String, required: Boolean },
    price: { type: Number, required: Boolean },
    category: { type: String },
    rating: { type: Number },
    userID: { type: String },
    allRatings: { type: Array }
});

const ProductModel = mongoose.model('products', productSchema);

module.exports = ProductModel;