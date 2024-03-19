const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const db = require("./db");

const person = require("./models/person.model");

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.post("/person", async (req, res) => {
    try {
        const data = req.body;

        const newPerson = new person(data);

        const response = await newPerson.save();
        console.log("data saved");
        res.status(200).json(response)
    } catch (error) {
        console.log("Error in saving the data from frontend", error);
        req.status(500).json({error: "Internal Server error"});

    }
})



app.listen(3000, () => {
    console.log("listening on port 3000");
});

