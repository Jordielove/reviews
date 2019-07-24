require('dotenv').config();
const mongoose = require('mongoose');
const password = process.env.password;
mongoose.connect(`mongodb://localhost/Reviews`, { useNewUrlParser: true }); 
const db = mongoose.connection;
mongoose.set('useFindAndModify', false);
const faker = require('faker');

db.on('error', console.error.bind(console, 'connection error:'));

const ReviewSchema = new mongoose.Schema({
    id: String,
    reviews: []
});


const seedWithFakeData = (id, data, cb) => {
    db.Reviews.insertMany()
}


const Reviews = mongoose.model('Reviews', ReviewSchema);

const getAll = (cb) => {
    Reviews.find()
        .then((data) => cb(data))
}

const addReview = (reviewData, id, cb) => {
    Reviews.findOneAndUpdate(
        { "id": id },
        { $push: { "reviews": reviewData }}
    )
    .then(cb());
}

// allItems is from oldData.js for initial seeding
// db.once('open', function () {
//     console.log("connected mofo");
//     allItems.map((newItem) => {
//         let item = new product(newItem);
//         item.save(() => {
//             console.log('item saved to database');
//         });
//     });
// }.bind(this));

module.exports = { seedWithFakeData, getAll, addReview };