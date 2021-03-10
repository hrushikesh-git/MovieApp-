const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    cast:{
        type:String,
        // required: true
    },
    director: { type:String, required: true },
    photo:{
        type:String,
        require:true
    },
    price:{
         type:Number 
    },
    time:{
        type:Number,
        required: true
    },
    generes:{
        type:String
    }
})

mongoose.model("Movie",movieSchema);