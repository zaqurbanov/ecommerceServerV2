const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  primaryImage:{
    type:String,
    required:true
  },
  secondaryImage:{
    type:String,
    required:true
  },

  primaryId:{
    type:String,
    required:true
  },
  secondaryId:{
    type:String,
    required:true
  }

}, { timestamps: true });


module.exports = mongoose.model("Blog",BlogSchema)