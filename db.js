const mongoose = require("mongoose");


const mongooUrl = "mongodb://localhost:27017/hotels";

mongoose.connect(mongooUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


const db = mongoose.connection;

db.on("connected" , () => {
    console.log("connected to mongodb server");
})

db.on("error", (err) => {
    console.log("ERR>>>", err);
})

db.on("disconnected", () => {
    console.log("MongoDB disconnected"); 
})

module.exports = db;