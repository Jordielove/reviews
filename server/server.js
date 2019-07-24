const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {PORT, HOST} = require('../config.js');
const db = require('./db.js');
const cors = require('cors');
const port = PORT || 3000;
const host = HOST || '0.0.0.0';
const sanitize = require('sanitize-html');
const fakeData = require('./generateFakeData.js')

app.use(cors());
app.use('/', express.static(__dirname + '/../dist'));
app.use('/products/:id', express.static(__dirname + '/../dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/reviews/:id", (req, res) => {
    // get reviews for product based on product id
    db.getAll((data) => {
        const reviews = data[data.map((product) => product.id).indexOf(req.params.id)].reviews;
        res.send(reviews);
    });
});

app.post("/writeReview/:id", (req, res) => {
    const months = {
        Jan: "January",
        Feb: "February",
        Mar: "March",
        Apr: "April",
        May: "May",
        Jun: "June",
        Jul: "July",
        Aug: "August",
        Sep: "September",
        Oct: "October",
        Nov: "November",
        Dec: "December"
    }
    const date = new Date();
    const year = date.getFullYear();
    const month = months[date.toDateString().split(" ")[1]];
    const day = date.getDate();
    const reviewData = {
        userName: sanitize(req.body.userName) || "HomeDepotCustomer",
        date: month + " " + day + ", " + year,
        header: sanitize(req.body.header) || req.body.rating + " Star Rating",
        review: sanitize(req.body.review) || "",
        rating: req.body.rating || 5,
        verifiedPurchase: false,
        recommend: req.body.recommend === "true",
        helpfulCount: 0,
        notHelpfulCount: 0,
        images: []
    }
    db.addReview(reviewData, req.params.id, () => {
     res.redirect("/products/" + req.params.id);
    });
});


// db.seedWithFakeData(id, reviews, () => {

// })

app.listen(port, host, () => {
    console.log("Listening to port 3000");
});