const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const {requireLogin,isAdmin} = require('../middleware/authmiddleware');
const BookedMovies = mongoose.model("BookedMovies");
const User = mongoose.model("User");
const Movie = mongoose.model("Movie");

// BookeMovie       post    /bookemovies/:movieid   private

router.post("/:movieid",requireLogin,(req,res)=>{
    const {seat,total} = req.body;
    if(!seat || seat === 0){
       return res.status(422).json({error:"Please Select the Number of Seats"});
    }
    req.user.password = undefined
    const bookedmovie = new BookedMovies({
        movie:req.params.movieid,
        bookedby:req.user,
        seat,
        total
    })
    bookedmovie.save()
    .then(result => {
        res.json({bookedmovie:result});
    }).catch(error=>{
        console.log(error)
    })

});

// BookeMovie       get    /bookemovies/mybookedmovies     private

router.get("/mybookedmovies",requireLogin, (req,res)=>{
    BookedMovies.find({bookedby: req.user._id})
    .populate('bookedby',"_id name email")
    .populate("movie","_id title director photo generes")
    .then(mymovie=>{
        res.json({mymovie})
    })
    .catch(err=>{
        console.log(err);
    })
})

// BookeMovie       get    /bookemovies/allbookedmovies     AdminOnly

router.get("/allbookedmovies",requireLogin,isAdmin,(req,res)=>{
    BookedMovies.find().populate("bookedby","_id name email").populate("movie","._id title director photo")
    .then(allbookedmovie=>{
        res.json({allbookedmovie});
    })
    .catch(err=>{
        console.log(err);
    })
})

// BookeMovie       delete    /bookmovies/delete/:movieid   private
router.delete("/delete/:movieid",requireLogin,(req,res)=>{
    // console.log(req.params.movieid)
    BookedMovies.findOne({_id:req.params.movieid})
    .populate("bookedby","_id")
    .exec((err,movie)=>{
        if(err || !movie){
            console.log(err)
            return res.status(422).json({error:err})
        }
        if(movie.bookedby._id.toString() === req.user._id.toString()){
            movie.remove()
            .then(result=>{
                res.json(result)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    })
})

// Delete Movies    Delete      /bookmovie/:movieid     AdminOnly

router.delete("/:movieid",isAdmin,(req,res)=>{
    BookedMovies.findOneAndRemove({_id:req.params.movieid},(err)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            return res.json({message:"Deleted Successfully Booked Movie"})
        }

    })
    
})

module.exports = router;