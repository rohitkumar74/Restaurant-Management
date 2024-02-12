const express = require('express');
const router = express.Router();
const menuItem = require('../models/menuItem');

// POST method for MenuItem
router.post('/', async(req, res) => {
    try{
      const data = req.body;
  
      const newMenu = new menuItem(data);
      const response = await newMenu.save();
       console.log('Menu is Save');
       res.status(200).json(response);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal server Error'});
    }
  })

// Get method for MenuItem
router.get('/', async(req, res) => {
    try{
      const data = await menuItem.find();
      console.log('Menu Item is Fetched');
      res.status(200).json(data);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error : 'Internal server Error'});
    }
  })

// parametrized API making for get method
  router.get('/:taste', async(req, res) => {
    try{
        const tasteType = req.params.taste; // // Extract the taste type from the URL parameter
        if(tasteType == 'sweet' || tasteType == 'sour' || tasteType == 'spicy' ){
            const response = await menuItem.find({taste: tasteType});
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'Invalid Taste type'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

  router.put('/:id', async(req, res) => {
    try{
        const menuId = req.params.id; // Extract the id of Menu Item from the URL parameter
        const updatedMenuData = req.body; // Updated data for the Menu Item

        const response = await menuItem.findByIdAndUpdate(menuId, updatedMenuData, {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validation
        })

        if (!response) {
            return res.status(404).json({error: 'Menu Item not found' });
        }

        console.log('Data Updated');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const menuId = req.params.id; // Extract the Menu's ID from the URL parameter
        
        // Assuming you have a MenuItem model
        const response = await menuItem.findByIdAndDelete(menuId);

        if (!response) {
            return res.status(404).json({ error: 'Menu Item not found' });
        }
        console.log('Data Deleted');
        res.status(200).json({message: 'Menu Deleted Successfully'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

  module.exports = router;