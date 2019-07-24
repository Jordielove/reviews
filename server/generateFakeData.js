const faker = require('faker');

const fakeData = () => {
    let data = [];
    for(let i=0; i<100000; i++) {
    data.push(faker.fake("{{lorem.sentences}}"));
    }
console.log(data);
}

fakeData();