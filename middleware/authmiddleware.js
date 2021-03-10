const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../keys');
const mongoose = require('mongoose');
const User = mongoose.model("User");

const requireLogin = (req,res,next) => {
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error:"Unauthorized Access Login"});
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            return res.status(401).json({error:"Unauthorized Login Please"});
        }
        const {_id} = payload;
        User.findById(_id)
        .then(userData=>{
            req.user = userData
            next();
        })
        .catch(err=>{
            console.log(err);
        })
    })
}

const isAdmin = (req,res, next) =>{
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error:"Unauthorized Access Login"});
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            return res.status(401).json({error:"Unauthorized Login Please"});
        }
        const {_id} = payload;
        User.findById(_id)
        .then(userData=>{
            req.user = userData
            if(userData.role === 1){
                next();
            }else{
                return res.status(422).json({error:"Admin access only"})
            }
            
        })
        .catch(err=>{
            console.log(err);
        })
    })
}

module.exports = {requireLogin,isAdmin}