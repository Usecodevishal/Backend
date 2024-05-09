//  const express = require("express");
import express from "express";
const app = express();
// const db = require("./db");
import db from "./db.js"
// const bodyParser = require("body-parser");
// what is the use of bodyparser extension here ?
import bodyParser from "body-parser";
app.use(bodyParser.json());

import "dotenv/config";

import passport from "./auth.js";


// import passport from "passport";
// import LocalStrategy from "passport-local";

// import Person from "./models/Person.js";

// passport.use(new LocalStrategy( async(USERNAME, password, done) => {
//     // authentication logic here

//     try {
//         console.log("Recieved Credentials:", USERNAME, password);
//         const user = await Person.findOne({username: USERNAME});
//         if(!user){
//             return done(null, false, { message: "Incorrect username"});
//         }

//             const isPasswordMatch = user.password === password ? true : false;
//             if(isPasswordMatch){
//                 return done(null, user);
//             }else{
//                 return done(null, false, {message: "Incorrect password."});
//             }
        

//     } catch (error) {
//         return done(error);
//     }
// }) )


app.use(passport.initialize());

// import dotenv from "dotenv";


// dotenv.config({path: "./env"});




// const Person = require("./models/Person");



import personRoutes from "./routes/person.routes.js";
app.use("/person", personRoutes);


//Importing menuItem routes

import menuItemRoutes from "./routes/menu.routes.js";
app.use("/menu", menuItemRoutes);
// const Menu = require("./models/menuItem.model");
//import Menu from "./models/menuItem.model.js";

app.get("/", passport.authenticate("local", {session: false}), (req, res) => {
    res.send("Hello World");
})





// app.post("/menu", async(req, res) => {
//     try{
//         const menuData = req.body;

//         const newMenu = new Menu(menuData);

//         const menuReqResponse = await newMenu.save();

//         console.log("new Menu Saved");
//         res.status(200).json(menuReqResponse);

//     }catch(error){
//         console.log("Error in saving the data from frontend of menu items", error);
//         res.status(500).json({error: 'Internal Server Error'});
//     }
// })

// app.get("/menu", async(req, res) => {
//     try{
//         const data = await Menu.find();
//         console.log("Menu Item Fetched");
//         res.status(200).json(data);
//     }catch(err){
//         console.log(err);
//         res.status(500).json({error: "Internal Server Error"});
//     }
// });



const PORT = process.env.PORT;


app.listen(PORT, () => {
    console.log("listening on port 3000");
    
});

