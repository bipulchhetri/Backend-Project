const express=require("express")
const router=express.Router()
const User=require("../schemas/user.schema")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
// SIGIN- user puts their credentials- look for existing user - 
// if user exists  tell email already exist - 
// if not create user - create a user in mongodb
// - send back jwt token
router.post("/signin",(res,req)=>{
    const{email,password}=req.body;
    const isUserExist=User.findone({email});
    if(isUserExist){
        res.statusCode(400).json({message:"Email alredy taken"})
        return;
    }
    else{
const hashedPassword=bcrypt.hashSync(password,10);
const newUser= await new User({email,password:hashedPassword}).save();
return res.statusCode(200).json({message:"User created successfully"})
    }
});