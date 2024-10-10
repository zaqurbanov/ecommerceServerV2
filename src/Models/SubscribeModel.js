const mongoose = require('mongoose')
const SubscribeModel = new mongoose.Schema({

    email:{
        type:String,
        required:true,
    }

},{timestamps:true})

module.exports = mongoose.model("Subscribe",SubscribeModel)