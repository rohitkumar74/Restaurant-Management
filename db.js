const mongoose = require('mongoose');
require('dotenv').config();

// define the mongoDb connection URL
// const mongoURL = process.env.MONGODB_URL_LOCAL  // Replace 'myDatabase' with your database name
const mongoURL = process.env.MONGODB_URL; // this is connect with mongoDb Atlas

// Set up mongoDb connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology:true
})

// get the default connection
// Mongoose maintains a default connection object representing the mongoDb connection.
const db = mongoose.connection;

// define EventListenerfor database connection

db.on('connected', () => {
    console.log('Connected to MongoDb server');
});

db.on('error', (err) => {
    console.log('MongoDb connection error:', err);
});

db.on('disconnected', () => {
    console.log('MongoDb Disconnected');
});

// Export the database connection 
module.exports = db;

