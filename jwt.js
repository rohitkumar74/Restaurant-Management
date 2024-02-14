const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {

    // first check request headers has authorization or not
    const authorization = req.headers.authorization
    if(!authorization){
        return res.status(401).json({error : 'Token not Found'});
    }

    // Extract the jwt token from the request header
    const token = req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).json({error: "Unauthorised"});
    }
    
    try{
        // verify the JWT token
        const decoded =jwt.verify(token, process.env.JWT_SECRET);

        // Attach user information to the request object
        req.user = decoded
        next();
    }
    catch(err){
        console.log(err);
        res.status(401).json({error : 'Invalid Token'});
    }
};

// function to Generate JWT token
const generateToken = (userData) => {
    // Generate a new JWT token using user data
    return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn: 300});   // this "expiresIn for expiry of JWT token"
}

module.exports = {jwtAuthMiddleware, generateToken};
