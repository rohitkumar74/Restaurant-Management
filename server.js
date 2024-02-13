// for exit from server => press ctrl + c
// for run server => node server4.js
// for automatic run => we use npx nodemon server4.js

const express = require('express')
const app = express();
const db = require('./db');   // this line is in upper line in code for establising server
require('dotenv').config();
const passport = require('./auth');

const bodyParser = require('body-parser');
app.use(bodyParser.json());  // req.body
const PORT = process.env.PORT || 3000;

// MiddleWare Function
const logRequest = (req, res, next) => {
   console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
   next();   // move onto next phase
}
app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session : false});

app.get('/', function (req, res) {
  res.send('Welcome to our hotel... How can i help you!')
})

 // Import the router files
 const personRoutes = require('./routes/personRoutes');
 const menuRoutes = require('./routes/menuRoutes');
 
 // use router 
 app.use('/person', personRoutes);
 app.use('/menu', menuRoutes);

app.listen(PORT, () =>{
  console.log('Listening on port 3000');
});