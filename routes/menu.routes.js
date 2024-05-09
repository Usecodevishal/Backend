import express from "express";
const router = express.Router();

//import menu Items from models.

import MenuItem from "../models/menuItem.model.js";


// code or function for delete menu through it's particular id.

router.delete("/:id", async (req, res) => {
    try{
        const menuItemId = req.params.id;
        const deleteMenuItem = await Person.findByIdAndDelete(menuItemId);

        if(!deleteMenuItem){
            return res.status(404).json({error:"Person not found"}); 
        }

        console.log("menuItem deleted");
         res.status(200).json({message: "MenuItem Deleted Successfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});

    }
})

//code or function for get and post

// for post

router.post("/", async (req, res) => {
    try {
        const data = req.body;
        const newMenuItem = new MenuItem(data);

        const response = await newMenuItem.save();
        console.log("data saved");
        res.status(200).json(response);
    } catch (error) {
        console.log("Error in saving the Item Data from frontend". error);
        res.status(500).json({error: "Internal Server error"});

    }
});

router.get("/", async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log("data fetched");
        res.status(200).json(data);
    } catch (error) {
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});

    }
});

router.get("/:tastetype", async(req, res) => {
    try{
        const tasteType = req.params.tastetype;
        if(tasteType = "sweet" || tasteType == "spicy" ||  tasteType == "sour"){
            const response = await MenuItem.find({taste: tasteType});
            console.log("response present hence fetched");
            res.status(200).json(response);
        }else{
            res.status(404).json({error:"Invalid taste type"});

        }
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Invalid Server Error"});

    }
})

 export default router;

