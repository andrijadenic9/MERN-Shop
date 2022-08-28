const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
    categoryName: { type: String, required: Boolean },
    nameLower: { type: String, required: Boolean },
});

const CategoriesModel = mongoose.model('categories', categoriesSchema);

module.exports = CategoriesModel;
