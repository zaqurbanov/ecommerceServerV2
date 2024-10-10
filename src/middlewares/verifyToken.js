const { JWT_SECRET_KEY } = require("../config/environment");
const Response = require("../config/Response");
const getCatchError = require("../helpers/catchErrorGenerator");
const jwt = require('jsonwebtoken')


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    

          
    try {
        if(!authHeader)
            throw new Error("Token not found");
            
            const token = authHeader.split(' ')[1];
 
            if (!authHeader || !authHeader.startsWith('Bearer ') ||token==null) {
             
                throw new Error("Access denied. No token provided");
        
        
    }    

  
    
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        
        req.user = decoded;
     
        
        next();
    } catch (error) {
             
        return getCatchError(error.message,res)
    }
}; 



module.exports = verifyToken