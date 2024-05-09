// const mongoose = require("mongoose");
import mongoose from "mongoose";

import "dotenv/config";

//dotenv.config({path: "./env"});

 const MONGOO_URL = process.env.LOCALMONGO_URL;
 //const MONGODB_URL = process.env.MONGODB_ATLAS;

//const mongooUrl = "mongodb://localhost:27017/hotels";
mongoose.connect(MONGOO_URL, {
    
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
export default db;
// module.exports = db;