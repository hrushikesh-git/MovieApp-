const mongoose = require('mongoose');
const Movie = mongoose.model("Movie");
const User = mongoose.model("User");
const {ObjectId} = mongoose.Schema.Types;

const bookedmoviesSchema = new mongoose.Schema({
    movie: { type:ObjectId, ref: "Movie" },
    bookedby:{type: ObjectId, ref:"User"},
    seat:{type:Number,required: true},
    total:{type:Number}
})

mongoose.model("BookedMovies",bookedmoviesSchema)