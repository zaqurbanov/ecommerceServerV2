const mongoose = require('mongoose');

const ImageModel = new mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    alt:{
        type:String,

    },


    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required:true
    },
    color:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Color',
        required:false
    },
    size:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Size',
        required:false
    },
    public_id:{
        type:String,
        required:true
    }
 
},{timestamps:true})

module.exports = mongoose.model('Image',ImageModel)