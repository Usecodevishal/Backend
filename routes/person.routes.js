// const express = require("express");
import express from "express";
const router = express.Router();

// const Person = require("../models/Person");
import Person from "../models/Person.js";

router.delete("/:id", async (req, res) => {
    try{
       const personId = req.params.id;
       const deletedPerson = await Person.findByIdAndDelete(personId);

       if(!deletedPerson){
        return res.status(404).json({error: "Person not found"});
       }

       console.log("data deleted");
       res.status(200).json({message: "person Deleted Successfully"});

        
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Internal Server Error"});
    }
})

router.post("/", async (req, res) => {
    try {
        const data = req.body;

        const newPerson = new Person(data);

        const response = await newPerson.save();
        console.log("data saved");
        res.status(200).json(response);
    } catch (error) {
        console.log("Error in saving the data from frontend", error);
        res.status(500).json({error: "Internal Server error"});

    }
});

router.get("/", async (req , res)=> {
    try{
        const data = await Person.find();
        console.log("data fetched");
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
});

router.get("/:worktype", async (req, res) => {
    try {
        const workType = req.params.worktype; //Extract the worktype from the url parameter.
        if(workType == "chef" || workType == "waiter" || workType == "manager"){
            const response = await Person.find({work: workType});
            console.log("response present hence fetched");
            res.status(200).json(response);
        }else{
            res.status(404).json({error: "Invalid work type"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Invalid Server Error"});
    }
})
export default router;
// module.exports = router;

