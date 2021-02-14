const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config');

module.exports = function(req, res, next){
    const token = req.headers["authorization"];
    if(!token){
        const error = new Error();
        error.message = "Token not found";
        error.status = 400;
        throw error
    }
    jwt.verify(token, JWT_SECRET, function(error, decodeToken){
        if(error){
            const error = new Error();
        error.message = "Invalid Token";
        error.status = 401;
        throw error
        }

        req.user = decodeToken.user;
        next();
    } )
}