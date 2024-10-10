const mongoose = require('mongoose')
const FaqSchema = new mongoose.Schema({


    question:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true})


module.exports = mongoose.model("Faq",FaqSchema)