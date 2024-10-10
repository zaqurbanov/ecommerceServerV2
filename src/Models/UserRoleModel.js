const mongoose = require('mongoose')


const RoleModel = new mongoose.Schema({
    role:{
        type:String,
        required:true
    }


},{timestamps:true})


module.exports = mongoose.model('Role',RoleModel)