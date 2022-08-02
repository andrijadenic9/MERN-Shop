const express = require('express');
const routes = express.Router();
const Users = require('../model/userModel');
const Emails = require('../model/emailModel');

routes.get('/get-all-stats', async (req, res) => {
    let userNumber;
    let emailNumber;

    await Emails.find((err, data) => {
        if (err) {
            res.send(err);
        } else {
            emailNumber = data.length;
        }
    })

    await Users.find((err, data) => {
        if (err) {
            res.send(err);
        } else {
            userNumber = data.length;
        }
        res.send({ users: userNumber, emails: emailNumber });
    })
})

