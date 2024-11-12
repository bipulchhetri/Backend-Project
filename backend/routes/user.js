// const express=require("express")
// const router=express.Router()
// const User=require("../schemas/user.schema")
// const bcrypt=require("bcrypt");
// const jwt=require("jsonwebtoken");
// const { default: mongoose } = require("mongoose");
// const env = require("dotenv");
// env.config();

// // SIGIN- user puts their credentials- look for existing user - 
// // if user exists  tell email already exist - 
// // if not create user - create a user in mongodb
// // - send back jwt token


// router.post("/signup",async(res,req)=>{
//    try{
//     const{email,password,name,phone}=req.body;
//     const isUserExist=await User.findone({email});
//     if(isUserExist){
//         res.status(400).json({message:"Email alredy taken"})
//         return;
//     }
//     else{
// const hashedPassword=bcrypt.hashSync(password,10);
// const newUser= await new User({email,password:hashedPassword,name,phone}).save();
// const token = jwt.sign({ email }, process.env.JWT_SECRET);

// return res.status(200).json({message:"User created successfully",token,id:newUser._id})
    
//    }
// }
//    catch(error){
//       console.error(error)
//       res.status(500).json({message:"Error creating user"});
//       }
  
// });

// // LOGIN- user enters their credentials- look for existing user -

// router.post("/signin",async(res,req)=>{
//    try{
//       const{email,password}=req.body;
//       const user=await User.findOne({email});
//       if(!user){
//          res.status(400).json({message:"Invalid email or password"})
//          return;
//          }
//          const isValidPassword=bcrypt.compareSync(password,user.password);
//          if(!isValidPassword){
//             res.status(400).json({message:"Invalid email or password"})
//             return;
//             }
//             const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expires_In:"1h"});
//                res.status(200).json({token})
//             }
//             catch(error){
//                res.status(500).json({message:"server error"})
//                }
//                })

// module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../schemas/user.schema")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();
// signin -> user puts their crednetials -> look for existing user -> if user exists -> tell them email already taken -> if not -> create user -> create a new User in mongodb -> send back a jwt token


router.post("/signup", async (req, res) => {
    try {
        const {email, password, name, phone } = req.body;
        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            res.status(400).json({ message: "Email already taken" });
            return;
        }
        else {
            const hashedPassword = bcrypt.hashSync(password, 10);
            const newUser = await new User({ email, password: hashedPassword, name, phone }).save();
            const token = jwt.sign({ email }, process.env.JWT_SECRET);
            return res.status(200).json({ message: "User created successfully", token, id: newUser._id });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
      //   const user = await User.findOne({email});
      const user= await User.findOne({email});
        if (!user) {
            res.status(400).json({ message: "Invalid email or password" });
            return;
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(400).json({ message: "Invalid email or password" });
            return
        }
        const token = jwt.sign({ email }, process.env.JWT_SECRET);
        return res.status(200).json({ message: "Login successful", token, id: user._id });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;

