const express = require('express');
const routes = express.Router();
const Comment = require('../model/commentModel');

routes.post('/add-comment', async (req, res) => {
    // console.log(req.body, 'ALOHA');

    const newComment = new Comment(req.body);
    const saveNewComment = newComment.save();
    res.send(saveNewComment || 'Comment is not saved')
})

routes.get('/get-comments/:productID', (req, res) => {
    // console.log(req.params, 'asdasa');

    Comment.find({ product_id: req.params.productID, comment_status: true }, (err, data) => {
        if (err) {
            res.send(err, 'GRESKA')
        }
        if (data) {
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

routes.delete('/delete-comment/:commentID', (req, res) => {
    // console.log(req.params);

    Comment.deleteOne({ _id: req.params.commentID }, (err, data) => {
        if (err) return res.send(err, 'GRESKAAA');
        if (data) res.send(data);
    });
})

routes.put('/change-comment-status', (req, res) => {
    // console.log(req.body, 'AAA');

    Comment.updateOne({ _id: req.body._id }, {
        $set: {
            comment_status: req.body.comment_status
        }
    }, (err, data) => {
        if (err) return res.send(err, 'GRESKAAA');
        if (data) res.send(data);
    })
})


module.exports = routes;
