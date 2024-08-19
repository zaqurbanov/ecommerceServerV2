const mongoose = require('mongoose');


const ProductModel = new mongoose.Schema({
        name:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        brand:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Brand',
            required:true
        },
        category:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Category',
            required:true
        },
        // colors:[{
        //     type:mongoose.Schema.Types.ObjectId,
        //     ref:'Color',
        // }],
        sizes:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Size',
            
        }],
        stock:{
            type:Number,
            default:0,
            min:0
        },
        inStock:{
            type:Boolean,
            default:true
        },
        // images:[{
        //     type:mongoose.Schema.Types.ObjectId,
        //     ref:'Image',
        // }],
        slug:{
            type:String,
            required:true
        }


},{timestamps:true})


module.exports = mongoose.model('Product',ProductModel)