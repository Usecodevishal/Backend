//  const express = require("express");
import express from "express";
const app = express();
// const db = require("./db");
import db from "./db.js"
// const bodyParser = require("body-parser");
import bodyParser from "body-parser";
app.use(bodyParser.json());

import dotenv from "dotenv";


dotenv.config({path: "./env"});



// const Person = require("./models/Person");

import Person from "./models/Person.js";

import personRoutes from "./routes/person.routes.js";
app.use("/person", personRoutes);

// const Menu = require("./models/menuItem.model");
import Menu from "./models/menuItem.model.js";

app.get("/", (req, res) => {
    res.send("Hello World");
})





app.post("/menu", async(req, res) => {
    try{
        const menuData = req.body;

        const newMenu = new Menu(menuData);

        const menuReqResponse = await newMenu.save();

        console.log("new Menu Saved");
        res.status(200).json(menuReqResponse);

    }catch(error){
        console.log("Error in saving the data from frontend of menu items", error);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

app.get("/menu", async(req, res) => {
    try{
        const data = await Menu.find();
        console.log("Menu Item Fetched");
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
});



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("listening on port 3000");
});

