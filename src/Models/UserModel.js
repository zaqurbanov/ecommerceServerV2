const mongoose  = require('mongoose')
const UserRoleModel = require('./UserRoleModel')

const UserModel = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    role:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Role',
        default:"66d06ef5b0f23133addb971c"
        
    },
    image:{
        type:String,
        default:""
    },
    image_public_id:{
        type:String
    },
    basket:{ 
        type:Array
    }


},{timestamps:true})


module.exports = mongoose.model('User',UserModel)