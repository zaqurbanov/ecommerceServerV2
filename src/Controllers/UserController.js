const generateResult = require('../helpers/resultGenerator')
const userService = require('../Services/userService')


const createUser =  async (req,res)=>{
        
        const {name,username,password,email} = req.body

        const result = await userService.registerUser(name,username,password,email)
        
        generateResult(res,result)
}


const loginUser = async (req,res)=>{
        const {username,password} = req.body
           
        const result = await userService.loginUser(username,password,res);

       
        generateResult(res,result)

} 

const logoutUser = async (req,res)=>{
    const result  = await userService.logoutUser(res)
    generateResult(res,result)
}

const verifyUser = async(req,res)=>{
        const result  = await userService.verifyUser(req.user) 
        generateResult(res,result)
}

const updateUser = async (req,res)=>{

        const user = req.user

        if(user){


      
        const {name,username,email} = req.body
     const image = req.files
            
        const result = await userService.updateUser(user,name,username,email,image)
        generateResult(res,result)   
        }
    
} 

const getDeleteUserImage = async(req,res)=>{
        const user  = req.user

        const result  = await userService.getDeleteUserImage(user)
        generateResult(res,result)

}
const getUserById = async(req,res)=>{
        const user = req.user 
                
        
                const result  = await userService.getUserById(user)
                generateResult(res,result)
}
const getAllUsers = async(req,res)=>{
        const result = await userService.getAllUsers()
        generateResult(res,result)  
}
module.exports = {
    createUser,
    loginUser,
    logoutUser,
    verifyUser,
    updateUser,
    getUserById,
    getAllUsers,
    getDeleteUserImage
} 