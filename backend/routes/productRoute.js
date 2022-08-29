const express = require('express');
const routes = express.Router();
const Product = require('../model/productModel');

routes.get('/get-all-product-from-db', (req, res) => {
    Product.find({}, (err, data) => {
        if (err) return res.send(err, 'GRESKAAA');
        if (data) res.send(data);
    });
})

module.exports = routes;
