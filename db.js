const mongoose = require('mongoose');

// define the mongoDb connection URL
const mongoURL = 'mongodb://127.0.0.1:27017/Hotels' // Replace 'myDatabase' with your database name

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

