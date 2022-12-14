const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const serverConfig = require('./config/serverConfig');
const dbConfig = require('./config/dbConfig');
const Users = require('./model/userModel');
const Emails = require('./model/emailModel');
const Product = require('./model/productModel');
const app = express();
const userRoute = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoute');
const productRoute = require('./routes/productRoute');
const paymentRoute = require('./routes/paymentRoute');
const commentRoute = require('./routes/commentRoute');
const fileUpload = require('express-fileupload');
const fs = require('fs');



mongoose.connect(dbConfig.MONGODB_URL)
    .then(data => console.log(`MONGODB is connected`))
    .catch(err => console.log(err))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload());
app.use(cors());

// * USER
app.use('/api/user', userRoute);

// * PAYMENT WITH STRIPE
app.use('/api/payment', paymentRoute);

// * ADMIN
app.use('/api/admin', adminRoute);

// * PRODUCT
app.use('/api/product', productRoute);

// * COMMENT
app.use('/api/comment', commentRoute);

app.post('/api/product/add-new-product', (req, res) => {
    console.log(req.body, 'boddyyy')
})

// app.get('/api/product/get-all-product-from-db', (req, res) => {
//     Product.find({}, (err, data) => {
//         if (err) return res.send(err, 'GRESKAAA');
//         if (data) res.send(data);
//     });
// })

// * ADD PRODUCT FORM ADMIN DASHBOARD
// TODO - POSTAVITI OVO U ADMIN ROUTE, POKUSAO BEZUSPESNO
app.post('/api/admin/add-product', (req, res) => {
    // console.log(req.body, 'OVDE SAM');
    // console.log(req.files.file, 'FILEEEE');
    const product = JSON.parse(req.body.product);
    // console.log(product, 'PRODUCTTT');
    const file = req.files.file;
    // console.log(file, 'FILEEEE');
    const path = `${__dirname}/uploadedFiles/products/`;
    const fileName = `${new Date().getTime()}_${file.name}`;
    const filePath = `${path}${fileName}`;

    file.mv(filePath, err => {
        if (err) return res.status(420).send('error file does not uploaded');
        Product.findOne(product, async (err, data) => {
            if (err) {
                res.status(421).send('Greska', err)
                return;
            }

            if (data) {
                res.send('Product already exist')
            } else {
                const newProduct = new Product({ ...product, img: fileName });
                const saveNewProduct = await newProduct.save();
                // console.log(saveNewProduct, 'saved producttt');
                res.send(saveNewProduct || 'Product not saved');
            }
        });
    })
})

// TODO - ubaciti u adminRoute samo promeniti path
app.get('/uploadedFiles/:imageName', (req, res) => {
    fs.readFile(__dirname + "/uploadedFiles/products/" + req.params.imageName, (err, data) => {
        if (err) {
            res.send('no file');
            return;
        }
        res.setHeader('Content-Type', 'image/jpg');
        res.setHeader('Content-Length', ''); // Image size here
        res.setHeader('Access-Control-Allow-Origin', '*'); // If needs to be public
        res.send(data);
    })
})

app.get('/uploadedFiles/avatars/:imageName', (req, res) => {
    fs.readFile(__dirname + "/uploadedFiles/avatars/" + req.params.imageName, (err, data) => {
        if (err) {
            res.send('no file');
            return;
        }
        res.setHeader('Content-Type', 'image/jpg');
        res.setHeader('Content-Length', ''); // Image size here
        res.setHeader('Access-Control-Allow-Origin', '*'); // If needs to be public
        res.send(data);
    })
})

// TODO - ovo treba popraviti
// * ADMIN
// ? U 'adminRoute' OVAJ API CALL JE URADJEM PREKO PROMISA JER PREKO ASYNC/AWAIT NIJE HTELO ZATO, DOBIJAMO GRESKU 'Query was already executed'
// app.get('/api/admin/get-all-stats', (req, res) => {
//     let userNumber;
//     let emailNumber;

//     Emails.find((err, data) => {
//         if (err) {
//             res.send(err);
//         } else {
//             emailNumber = data.length;
//         }
//     })

//     Users.find((err, data) => {
//         if (err) {
//             res.send(err);
//         } else {
//             userNumber = data.length;
//         }
//         res.send({ users: userNumber, emails: emailNumber });
//     })
// });

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


// * SINGLE PRODUCT FORM DB
app.get('/api/product/get-single-product-from-db/:id', (req, res) => {
    Product.findOne({ _id: req.params.id }, (err, data) => {
        if (err) {
            console.log(err, 'greskaa');
            res.send(err);
            return;
        }
        if (data) {
            // console.log(data, 'dataaa');
            res.send(data);
        }
    });
});

// * SET RATINGS
app.put('/api/products/set-rating', (req, res) => {
    const allRatings = req.body.allRatings;
    const averageRating = req.body.averageRating;
    const id = req.body.id;

    Product.updateOne(
        { _id: id }, { allRatings: [...allRatings], rating: averageRating },
        null, (error, data) => {
            if (error) throw error;
            res.send(data);
        })
})

// * GET RATINGS
app.get('/api/products/get-rating/:id', (req, res) => {
    const id = req.params.id;
    Product.find({ _id: id }, (error, data) => {
        if (error) {
            console.log(error);
            res.send(error)
        }
        // console.log(data, 'vodeeee');
        res.send({ allRatings: data[0].allRatings, rating: data[0].rating })
    })
})


// * SERVER
app.listen(serverConfig.port, err => {
    if (err) console.log('ERROR Message: ' + err);
    else console.log(serverConfig.serverRunningMessage);
});


app.put('/api/user/update-user-with-avatar', (req, res) => {
    const updatedUser = JSON.parse(req.body.userProfile);
    const file = req.files.file;

    console.log(updatedUser, 'updatedUser');
    console.log(file, 'FILEE');

    const path = `${__dirname}/uploadedFiles/avatars/`;
    const fileName = `${new Date().getTime()}_${file.name}`;
    const filePath = `${path}${fileName}`;

    file.mv(filePath, err => {
        if (err) return res.status(420).send('error file does not uploaded');
        Users.updateOne({ _id: updatedUser._id }, {
            $set: {
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                address: updatedUser.address,
                city: updatedUser.city,
                username: updatedUser.username,
                email: updatedUser.email,
                avatar: fileName,
                phoneNumber: updatedUser.phoneNumber,
                postCode: updatedUser.postCode,
                gender: updatedUser.gender,
                isAdmin: updatedUser.isAdmin,
                isActive: updatedUser.isActive
            }
        }, (err, data) => {
            if (err) {
                const errorMsg = `Error on updating user: ${err}`;
                console.log(err);
                res.send(errorMsg);
            } else {
                console.log(data, 'OVAMOOO');
                res.send({ data, fileName: fileName });
            }
        });
    })
});