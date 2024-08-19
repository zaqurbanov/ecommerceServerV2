const mongoose = require('mongoose')


const CategoryModel = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    slug:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model("Category",CategoryModel)