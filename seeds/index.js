const mongoose = require('mongoose');
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

// connect to MongoDB using mongoose
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelp-camp');
    console.log("DATABASE CONNECTED")
}
const sample = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
}

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "6304646a7c6806797d2cefba",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/niejiayi1998/image/upload/v1661365174/YelpCamp/gbgrebycavdwwzxuesf5.jpg',
                    filename: 'YelpCamp/gbgrebycavdwwzxuesf5'
                },
                {
                    url: 'https://res.cloudinary.com/niejiayi1998/image/upload/v1661365175/YelpCamp/tiqmdwxsslw4biioiyv6.jpg',
                    filename: 'YelpCamp/tiqmdwxsslw4biioiyv6'
                }
            ],
            description: "The camping welcomes you with there 90 pitches including 13 accommodation on a terrain of more than 3 hectares of land and terraces. And the campsite has a pitch and a shower and toilet for people with reduced mobility, but the terrain because of its topography is hard in accessibility.",
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            }
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})