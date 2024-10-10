const mongoose = require('mongoose')

const TestimonialSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    rating:{
        type:Number,
        enum:[1,2,3,4,5],
        default:2
    },
    title:{
        type:String,
        required:true,
    },
    comment:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:false
    }


})

module.exports = mongoose.model("Testimonial",TestimonialSchema)