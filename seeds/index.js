const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/couch-surfers')
    .then(()=>{
        console.log("DB Connected");
    })
    .catch((err)=>{
        console.log("Connection Error");
        console.log(err);
    })

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async ()=>{
    await Campground.deleteMany({});

    for(let i=0;i<200;i++){
        const random200 = Math.floor(Math.random()*200);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author : '676c191d71b6927e0acf79c8',
            location : `${cities[random200].City}, ${cities[random200].State}`,
            title : `${sample(descriptors)} ${sample(places)}`,
            description : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore voluptatibus deleniti laboriosam itaque fuga consequuntur corporis laborum unde alias distinctio! Nobis magni, debitis eum porro quas quaerat temporibus dolorem enim!',
            price,
            geometry: {
                type: 'Point',
                coordinates:[
                    cities[random200].Longitude,
                    cities[random200].Latitude
                ]
            },
            images : [
                {
                    url: 'https://res.cloudinary.com/diqdrr5he/image/upload/v1735707839/FindCamp/pis21qhrebywhlgcrm5j.jpg',
                    filename: 'FindCamp/pis21qhrebywhlgcrm5j'
                  },
                  {
                    url: 'https://res.cloudinary.com/diqdrr5he/image/upload/v1735707840/FindCamp/eo6ujtfblld6bdin3dyh.jpg',
                    filename: 'FindCamp/eo6ujtfblld6bdin3dyh'
                  }
            ]
        })
        await camp.save();
    }
}

seedDB()
    .then(()=>{
        mongoose.connection.close();
    })