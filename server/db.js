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

const Reviews = mongoose.model('Reviews', ReviewSchema);

const bulkAddReviews = (startIndex) => {
    let data = [];
    for(let i = startIndex; i < startIndex + 100000; i++) {
    let review = {
        id: i,//figure out a way to get unique ids for each one
        review: faker.fake("{{lorem.sentences}}")
     }
     data.push(review);
     review = {};
    }
    Reviews.collection.insertMany(data)
    .then(() => {
        if(startIndex > 10000000) {
            return;
        } else {
            console.log('Start index:', startIndex);
            bulkAddReviews(startIndex + 100000);
        }
    })
    .catch((err) => {
        console.log(err);
    })
}
bulkAddReviews(1);



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

module.exports = { bulkAddReviews, getAll, addReview };