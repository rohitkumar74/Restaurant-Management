const express = require('express');
const router = express.Router();
const person = require('./../models/person');
const {jwtAuthMiddleware, generateToken} = require('./../jwt');
const { JsonWebTokenError } = require('jsonwebtoken');

// Post route to add a person
router.post('/signup', async(req, res) => {
    try{
      const data = req.body;
      
      const newPerson = new person(data);
      const response = await newPerson.save();
      console.log('Data Saved !');

      const payload = {
        id: response.id,
        username: response.username
      }
      console.log(JSON.stringify(payload));
      const token = generateToken(payload);
      console.log("Token is : ", token);

      res.status(200).json({response : response, token : token});
    }
    catch(err){
       console.log(err);
       res.status(500).json({error: 'Internal server Error'});
    }
  })

  // login Route
  router.post('/login', async(req, res) => {
    try{
      // Extract username and password from request body
      const {username, password} = req.body;

      // Find the user by username
      const user = await person.findOne({username: username});

      //if user does not exist or password doesnot match return error
      if(!user || (await user.comparePassword(password))){
       return res.status(401).json({error: 'Invalid username or password'}); 
      }

      // generate token
      const payload = {
        id: user.id,
        username: user.username
      }
      const token = generateToken(payload);

      // return token as response
      res.json({token});
    }
    catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal server Error'});
   }
  });

  // Profile routes 
  router.get('/profile', jwtAuthMiddleware, async(req, res) => {
    try{
    const userData = req.user;
    console.log("User Data: ", userData);

    const userId = userData.id;
    const user = await person.findById(userId);
    res.status(200).json(user);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal server Error'});
   }
  })

  // for reading data we use GET method
    router.get('/',JsonWebTokenError, async(req, res) => {
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
            return res.status(404).json({error: 'Person Not Found'});
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
  // this is export the router
  module.exports = router;