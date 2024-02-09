const express = require('express');
const router = express.Router();
const person = require('./../models/Person');
const { findByIdAndDelete } = require('../models/menuItem');

// Post route to add a person
router.post('/', async(req, res) => {
    try{
      const data = req.body;
      
      const newPerson = new Person(data);
      const response = await newPerson.save();
      console.log('Data Saved !');
      res.status(200).json(response);
    }
    catch(err){
       console.log(err);
       res.status(500).json({error: 'Internal server Error'});
    }
  })

  // for reading data we use GET method
    router.get('/', async(req, res) => {
    try{
      const data = await person.find();
      console.log('Data is Fetched !');
      res.status(200).json(data);
    }
    catch(err){
     console.log(err);
     res.status(500).json({error: 'Internal server Error'});
    }
  })

  // parametrized API making for get method
  router.get('/:workType', async(req, res) => {
    try{
       const workType = req.params.workType   // Extract the worktype from URL
       if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
        const response = await person.find({work : workType});
        console.log('Data is Fetched');
        res.status(200).json(response);
       }
       else{
        res.status(404).json({error : 'Invalid Work type'});
       }
    }
    catch(err){
      console.log(err);
      res.status(500).json({error : 'Internal Server Error'});
    }
  })

  router.put('/:id', async(req, res) => {
    try{
        const personId = req.params.id;  // Extract the id from the URL parameter
        const updatedPersonData = req.body;  // updated data for the person

        const response = await person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,   // Return the updated document
            runValidators: true,  // Run Mongoose validation
        })

        if(!response){
            return res.status(404).json({error: 'Person Not FOund'});
        }

        console.log('Data Updated');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
      res.status(500).json({error : 'Internal Server Error'});
    }
  })

  router.delete('/:id', async(req, res) => {
    try{
        const personId = req.params.id;   // Extract the id from the URL parameter
        
        // Assuming you have a person model
        const response = await person.findByIdAndDelete(personId);
        
        if(!response){
            return res.status(404).json({error: 'Person Not FOund'});
        }

        console.log('Data Deleted');
        res.status(200).json({message: 'Person deleted Sucessfully'});
    }

    catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal Server Error'});
    }
  })
  module.exports = router;