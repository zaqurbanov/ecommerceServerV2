const Response = require("../config/Response");
const getCatchError = require("../helpers/catchErrorGenerator");
const generateResult = require("../helpers/resultGenerator");
const UserRoleModel = require("../Models/UserRoleModel");

 const verifyAdmin = async (req, res, next) => {

    
  try {
    
  const adminRole = await UserRoleModel.findOne({role:"admin"})
        
    
    if (req.user.role.role !== adminRole.role) {
        
      const result= Response.error("Access denied. Admins only.",null,403);
     return generateResult(res,result)
    }
   
 next(); 
  } catch (error) {
    return getCatchError(error.message,res)
  }
  
   
  };

  module.exports = verifyAdmin  