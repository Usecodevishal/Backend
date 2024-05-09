// const mongoose = require("mongoose");
//import { text } from "body-parser";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},{timestamps:true});

// personSchema.pre('save', async function(next){
//     const person = this;

//     // Hash the password only if it has been modified (or is new)

//     if(!person.isModified('password')) return next();

//     try {
//         // salt generate by bcrypt function "gensalt"
//         const salt = await bcrypt.genSalt(10);

//         // hash password + salt
//         const hashedPassword =  await bcrypt.hashPassword(person.password, salt);

//         // Overwrite the plain password with the hashed one
//         person.password = hashedPassword;
        
//         next();
//     } catch (error) {
//         return done(error);
//     }
// })


  personSchema.pre('save', async function(next){
    const person = this;

    // check only if password is not modified or created
    if(!person.isModified('password')) return next();
    try {
        // salt generate by bcrypt only by its method "genSalt"
        const salt = await bcrypt.genSalt(10);

        // generat hashed password + salt
        const hashedPassword = await bcrypt.hash(person.password, salt);

        //Overwrite the plain password with hashed password.
        person.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
  })

  personSchema.method.comparePassword = async function(candidatePassword){
    try {
        // use bcrypt to compare password with hashed password;
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
  }
 const Person = mongoose.model("Person", personSchema);
 
 export default Person;