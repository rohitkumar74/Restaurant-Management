// sets up paaport with a local authentication strategy, using a person model for user dat - auth.js file

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const person = require('./models/person');  // adjust the path as needed


passport.use(new localStrategy (async(USERNAME, password, done) =>{
    // authentication logic here
    try{
      // console.log('Received credentials', USERNAME, password);
      const user = await person.findOne({username : USERNAME});
       if(!user){
        return done(null, false, {message : 'Incorrect username'});
       }
  
       const isPasswordMatch = await user.comparePassword(password);
       if(isPasswordMatch){
        return done(null, user);
       }
       else{
        return done(null, false, {message : 'Incorrect Password'});
       }
    }
    catch(error){
       return done(error);
    }
  }));

  module.exports = passport; // export configured password