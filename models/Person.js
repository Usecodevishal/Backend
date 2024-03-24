// const mongoose = require("mongoose");
import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        enum: ["chef","waiter","manager"],
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    }
},{timestamps:true});

 const Person = mongoose.model("Person", personSchema);
 
 export default Person;