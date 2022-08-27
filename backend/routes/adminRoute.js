const express = require('express');
const routes = express.Router();
const Users = require('../model/userModel');
const Emails = require('../model/emailModel');
const Product = require('../model/productModel');
const app = express();
const fileUpload = require('express-fileupload');
const fs = require('fs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload());

routes.get('/get-all-stats', (req, res) => {
    let userNumber;
    let emailNumber;

    Emails.find().then(data => { emailNumber = data.length }).catch(err => { res.send('greska', err) })

    Users.find().then(data => { userNumber = data.length }).catch(err => { res.send('greskaa', err) }).finally(() => { res.send({ users: userNumber, emails: emailNumber }) })

});

routes.put('/update-product', (req, res) => {
    console.log(req.body, 'izmenjeni product');

    Product.updateOne({_id: req.body._id}, {$set: req.body}, (err, data)=>{
        if(err) {
            res.send(err);
            return;
        }
        if(data) res.send(data);
    })
})

routes.delete('/delete-product/:productID', (req, res) => {
    console.log(req.params.productID);
    Product.deleteOne({_id: req.params.productID}, (err, data)=>{
        if(err) {
            res.send(err);
            return;
        }
        if(data) res.send(data);
    })
})

routes.get('/get-all-users', (req, res) => {
    Users.find((err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
});

module.exports = routes;