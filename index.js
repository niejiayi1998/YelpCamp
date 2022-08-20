const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Campground = require("./models/campground");

// connect to MongoDB using mongoose
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelp-camp');
    console.log("DATABASE CONNECTED")
}
const db = mongoose.connection;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    res.render("home");
})

app.get("/makecampground", async (req, res) => {
    const camp = new Campground({ title: "My Backyard", description: "Cheap Camping" })
    await camp.save();
    res.send(camp);
})
    
app.listen(3000, () => {
    console.log("Serving on port 3000");
})