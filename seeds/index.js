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
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "6304646a7c6806797d2cefba",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: `https://source.unsplash.com/random/300x300?camping,${i}`,
            image: "https://source.unsplash.com/collection/483251",
            description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum porro quo distinctio similique odio natus sint laboriosam fugiat minima! Nulla recusandae libero dolores ratione illo ea eos nobis accusantium autem.",
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})