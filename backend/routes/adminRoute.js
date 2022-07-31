// const express = require('express');
// const routes = express.Router();
// const Users = require('../model/userModel');
// const Emails = require('../model/emailModel');

// routes.get('/get-all-stats', (req, res) => {

//     Users.find((err, data) => {
//         if (err) {
//             res.send(err);
//         } else {
//             console.log(data);
//             res.send(data)
//         }
//     })

// })

// routes.post('/complete-registration', (req, res) => {
//     const userID = req.body.userID;

//     Users.updateOne({ _id: userID }, { isActive: true }, (err, data) => {
//         if (err) {
//             res.send(err);
//         } else {
//             res.send(data)
//         }
//     });
// });