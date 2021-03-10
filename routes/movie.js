const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Movie = mongoose.model("Movie");
const {requireLogin,isAdmin} = require('../middleware/authmiddleware');

// createMovies     post    /movie/createmovie      AdminOnly

router.post("/createmovie",requireLogin,isAdmin,(req,res)=>{
    const {title,description,director,time,pic,price,cast,generes} = req.body;
    if(!title || !description || !director || !pic || !time){
        return res.status(422).json({error:"Please add all fields"})
    }
    // req.user.password = undefined
    const movie = new Movie({
        title,
        description,
        director,
        time,
        generes,
        cast,
        price,
        photo:pic
    })
    movie.save().then(result=>{
        res.json({movie:result});
    }) 
    .catch(err=>{
        console.log(err);
    })
});

// Show movies     get    /movie/allmovies      Public

router.get("/allmovies",requireLogin,(req,res)=>{
  Movie.find()
  .then(movies=>{
      res.json({movies})
  }).catch((err)=>{
      console.log(err);
  })  
})

// Show movies     get    /movie/:movieid      Public
router.get("/:movieid",(req,res)=>{
    Movie.findOne({_id:req.params.movieid})
    .then(movie=>{
        res.json({movie})
    }).catch(err=>{
        return res.status(404).json({error:"Movie Not Found"})
    })
})

// Delete Movies    Delete      /movie/:movieid     AdminOnly

router.delete("/:movieid",isAdmin,(req,res)=>{
    Movie.findOneAndRemove({_id:req.params.movieid},(err)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            return res.json({message:"Deleted Successfully"})
        }

    })
    
})

module.exports = router