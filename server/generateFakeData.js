const faker = require('faker');

const getFakeData = () => {
    let data = [];
    for(let i = 0; i < 100000; i++) {
    let review = {
        //figure out a way to get unique ids for each one
        review: faker.fake("{{lorem.sentences}}")
     }
     data.push(review);
     review = {};
    }
console.log(data);
}


const runFakeData100Times = () => {
    let id = 0;
    for( let x = 0; x < 100; x++ ) {
        getFakeData();
    }

}

runFakeData100Times();

// modules.exports ={ fakeData };