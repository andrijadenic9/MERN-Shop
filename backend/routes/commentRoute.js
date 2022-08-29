const express = require('express');
const routes = express.Router();
const Comment = require('../model/commentModel');

routes.post('/add-comment', async (req, res) => {
    console.log(req.body, 'ALOHA');

    const newComment = new Comment(req.body);
    const saveNewComment = newComment.save();
    res.send(saveNewComment || 'Comment is not saved')
})

routes.get('/get-comments/:productID', (req, res) => {
    console.log(req.params, 'asdasa');

    Comment.find({ product_id: req.params.productID }, (err, data) => {
        if (err) {
            res.send(err, 'GRESKA')
        }
        if (data) {
            // console.log(data,'OVDE SAM');
            res.send(data)
        }
    })
})

routes.get('/get-all-comments', (req, res) => {
    Comment.find({}, (err, data) => {
        if (err) return res.send(err, 'GRESKAAA');
        if (data) res.send(data);
    });
})


module.exports = routes;
