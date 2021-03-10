const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const bcrypt = require('bcryptjs');
const {requireLogin,isAdmin} = require('../middleware/authmiddleware');

// Show all user     get    /user/alluser      AdminOnly

router.get("/alluser",requireLogin,isAdmin,(req,res)=>{
    User.find()
    .select("-password")
    .then(user=>{
        res.json({user})
    }).catch((err)=>{
        console.log(err);
    })  
  })

  // Show user     get    /user/:userid   private
  router.get("/:userid",requireLogin,(req,res)=>{
      User.findOne({_id:req.params.userid})
      .select("-password")
      .then(user=>{
          res.json({user})
      })
      .catch(err=>{
          return res.status(404)/json({error:"User Not found"})
      })
  })

// Delete User     delete    /user/:userid      AdminOnly
router.delete("/:userid",isAdmin,(req,res)=>{
    User.findOneAndRemove({_id:req.params.userid},(err)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            return res.json({message:"Deleted User"})
        }
    })
})

// Change Password     put    /user/password      private
router.put("/password",requireLogin,(req,res)=>{
    const {passwordc} = req.body
    bcrypt.hash(passwordc,10)
    .then(hashpassword=>{
        bcrypt.compare(password,req.user.password)
        .then(domatch=>{
            if(domatch){
                User.findIdAndUpdate(req.user._id,{password:hashpassword},{new: true})
                .exec((err,result)=>{
                    if(err){
                        return res.status(422).json({error:err})
                    }else{
                        res.json(result);
                    }
                })
            }else{
                return res.status(422).json({error:"Invalid Email or Password"})
            }
        }).catch(err=>{
            console.log(err)
        })
    })

})

  module.exports = router;