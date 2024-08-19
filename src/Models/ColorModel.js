
const mongoose =require('mongoose');


const ColorModel = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    hexCode:{
        type:String
    },
    slug:{
        type:String,
        required:true
    }

} ,{timestamps:true})


module.exports = mongoose.model("Color",ColorModel)