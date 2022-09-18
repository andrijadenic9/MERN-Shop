const express = require('express');
const routes = express.Router();
const Users = require('../model/userModel');
const Emails = require('../model/emailModel');
const Product = require('../model/productModel');
const Categories = require('../model/categoriesModel.js');
const app = express();
const fileUpload = require('express-fileupload');
const fs = require('fs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload());

// * GET ALL
routes.get('/get-all-stats', (req, res) => {
    let userNumber;
    let emailNumber;
    let productNumber;

    Emails.find().then(data => { emailNumber = data.length }).catch(err => { res.send('greska', err) })
    Product.find().then(data => { productNumber = data.length }).catch(err => { res.send('greska', err) })

    Users.find().then(data => { userNumber = data.length }).catch(err => { res.send('greskaa', err) }).finally(() => { res.send({ users: userNumber, emails: emailNumber, products: productNumber }) })

});

routes.get('/get-all-users', (req, res) => {
    Users.find((err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
});

routes.get('/get-all-categories', (req, res) => {
    Categories.aggregate([
        {
            $lookup: {
                from: "products",
                localField: "nameLower",
                foreignField: "category",
                as: "allProducts"
            }
        },
        { $sort: { categoryName: 1 } }

    ]).then((result) => {
        res.send(result)
    }).catch((error) => {
        const errMsg = "Error with get all categories, " + error
        res.send(errMsg)
    })
})

// * ADD
routes.post('/add-category', (req, res) => {
    // console.log(req.body, 'adddd');
    const categoryName = req.body.categoryName;

    Categories.findOne({ categoryName: categoryName }, async (err, data) => {
        if (err) {
            res.send(err);
            return;
        }
        if (data) {
            res.send('Category already exist!');
        } else {
            const newCategory = new Categories({ categoryName: categoryName, nameLower: categoryName.toLowerCase() });
            const saveNewCategory = await newCategory.save();
            // console.log(saveNewCategory, 'savenewCat');
            res.send(saveNewCategory || 'Category is not saved');
        }
    })
})

// * EDIT
routes.put('/update-category', (req, res) => {
    console.log(req.body, 'izmenjeni product');

    Categories.updateOne({ _id: req.body._id }, { $set: req.body, nameLower: req.body.categoryName.toLowerCase() }, (err, data) => {
        if (err) {
            res.send(err);
            return;
        }
        if (data) res.send(data);
    })
})

routes.put('/update-product', (req, res) => {
    console.log(req.body, 'izmenjeni product');

    Product.updateOne({ _id: req.body._id }, { $set: req.body }, (err, data) => {
        if (err) {
            res.send(err);
            return;
        }
        if (data) res.send(data);
    })
})

// * DELETE
routes.delete('/delete-product/:productID/:image', (req, res) => {
    // console.log(req.params, 'PARAMS');
    Product.deleteOne({ _id: req.params.productID }, (err, data) => {
        if (err) {
            res.send(err);
            return;
        }
        if (data) {
            // * delete image
            fs.unlinkSync(__dirname + '/../uploadedFiles/products/' + req.params.image, (err, data) => {
                if (err) {
                    res.send('Error, files is not deleted');
                    return;
                }
                res.send('File successfully deleted');
            });
            res.send(data);
        }
    })
})

routes.delete('/delete-category/:categoryID', (req, res) => {
    // console.log(req.params.categoryID, 'CATEGORY ID');
    Categories.deleteOne({ _id: req.params.categoryID }, (err, data) => {
        if (err) {
            res.send(err);
            return;
        }
        if (data) res.send(data);
    })
})

routes.delete('/delete-old-avatar/:avatar', (req, res) => {
    // console.log(req.params.avatar, 'AVATAR');
    fs.unlinkSync(__dirname + '/../uploadedFiles/avatars/' + req.params.avatar, (err, data) => {
        if (err) {
            res.send('Error, files is not deleted');
            return;
        }
        res.send('File successfully deleted');
    })
})

module.exports = routes;