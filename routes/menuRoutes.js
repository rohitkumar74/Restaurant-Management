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

  module.exports = router;