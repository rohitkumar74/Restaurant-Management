// for exit from server => press ctrl + c
// for run server => node server4.js
// for automatic run => we use npx nodemon server4.js

const express = require('express')
const app = express();
const db = require('./db');   // this line is in upper line in code for establising server
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());  // req.body
const PORT = process.env.PORT || 3000;

// MiddleWare Function
const logRequest = (req, res, next) =>{
   console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
   next();   // move onto next phase
}

const menuItem = require('./models/menuItem');

app.get('/', logRequest, function (req, res) {
  res.send('Welcome to my hotel... How can i help you!')
})

// **** this is not write method to write callback function -> we write callback function by using async and await function

// app.post('/person', (req, res) => {
//     const data = req.body;  // assuming the request body contains the person data

//     // Create a new person document using the mongoose model
//     const newPerson = new Person(data);

//     // save the new person to the database
//     newPerson.save((error, savedPerson) =>{
//       if(error){
//         console.log('Error saving person', error);
//         res.status(500).json({error: 'Internal server error'})
//       }
//       else{
//         console.log('data saved successfully');
//         res.status(200).json(savedPerson);
//       }
//     })

// })


 // Import the router files
 const personRoutes = require('./routes/personRoutes');
 const menuRoutes = require('./routes/menuRoutes');
 
 // use router 
 app.use('/person', personRoutes);
 app.use('/menu', menuRoutes);

// app.get('/chicken', (req, res) => {
//     res.send('sure sir, i would love to serve chicken')
// })

// app.post('/items', (req, res) =>{
//   res.send('Data is Send')
// })
// app.get('/idli', (req, res) => {
//     var custimised_idli = {
//       name: 'rava idli',
//       size: '8 cm in diameter',
//       is_sambhar: true,
//       is_chutney: false
//     }
//     res.send(custimised_idli)
// })


app.listen(PORT, () =>{
  console.log('Listening on port 3000');
});