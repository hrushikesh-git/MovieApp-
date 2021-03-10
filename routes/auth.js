const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {JWT_SECRET} = require('../keys');
const User = mongoose.model("User");
const {requireLogin,isAdmin} = require('../middleware/authmiddleware')

// SignUp       post      /auth/signup

router.post("/signup",(req,res)=>{
    const {email,name,password} = req.body
    if(!email || !password || !name){
        return res.status(422).json({error:"Please add all fields"});
    }
    User.findOne({email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"User already exsist"})
        }
        bcrypt.hash(password,10)
        .then(hashedpassword => {
            const user = new User({
                name,
                email,
                password:hashedpassword
            })
            user.save()
            .then(user=>{
                res.json({message:"Saved Succcessfully"})
            }).catch(err=>{
                console.log(err);
            })
        })
      
    })
    
})

// SignIn       post      /auth/signin


router.post('/signin',(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(422).json({error:"Please Add Email or Password"})
    }
    User.findOne({email})
    .then(savedUser => {
        if(!savedUser){
            return res.status(422).json({error:"Invalid email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"SignIn successfull"})
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                const {_id,name,email,role} = savedUser
                res.json({token,user:{_id,email,name,role}})
            }else{
                return res.status(422).json({error:"Invalid Email or Password"})
            }
        }).catch(err=>{
            console.log(err);
        })
    }).
    catch(err=>{
        console.log(err);
    })
})



module.exports = router