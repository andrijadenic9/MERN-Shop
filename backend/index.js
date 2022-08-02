const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const serverConfig = require('./config/serverConfig');
const dbConfig = require('./config/dbConfig');
const Users = require('./model/userModel');
const Emails = require('./model/emailModel');
const app = express();
const userRoute = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoute');
const paymentRoute = require('./routes/paymentRoute');

mongoose.connect(dbConfig.MONGODB_URL)
    .then(data => console.log(`MONGODB is connected`))
    .catch(err => console.log(err))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// * USER
app.use('/api/user', userRoute);

// * PAYMENT WITH STRIPE
app.use('/api/payment', paymentRoute);

// TODO -ovo treba popraviti
// * ADMIN
// app.use('/api/admin', adminRoute);
app.get('/api/admin/get-all-stats', (req, res) => {
    let userNumber;
    let emailNumber;

    Emails.find((err, data) => {
        if (err) {
            res.send(err);
        } else {
            emailNumber = data.length;
        }
    })

    Users.find((err, data) => {
        if (err) {
            res.send(err);
        } else {
            userNumber = data.length;
        }
        res.send({ users: userNumber, emails: emailNumber });
    })
});

app.get('/api/admin/get-all-users', (req, res) => {
    Users.find((err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
});

app.put('/api/admin/edit-user', (req, res) => {
    const userID = req.body._id;

    Users.find({ _id: userID }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});



// * CONTACT MESSAGE API CALL
app.post('/send-message', async (req, res) => {
    const reqBody = req.body;

    // * ADD TO DATABASE
    const newMessage = new Emails(reqBody);
    const saveNewMessage = await newMessage.save();
    // console.log(saveNewMessage);

    // * NODEMAILER
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `${reqBody.firstName} ${reqBody.lastName} <${reqBody.email}>`, // sender address
        to: "onlineShop, office@onlineShop.com", // list of receivers
        // subject: "", // Subject line
        // text: "Hello world?", // plain text body
        html: `
        <p>
            ${reqBody.message}
        </p>
        `, // html body

    });

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.send();
});

// * SERVER
app.listen(serverConfig.port, err => {
    if (err) console.log('ERROR Message: ' + err);
    else console.log(serverConfig.serverRunningMessage);
});