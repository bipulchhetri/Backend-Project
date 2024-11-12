const express=require ("express");
const router=express.Router();
const job=require("../schemas/job.schema")
const User=require("../schemas/user.schema")
const {isLoggedIn}=require('../middleware/auth')
const jwt=require("jsonwebtoken")
const env=require("dotenv");
env.config();
router.post("/create",async(res,req)=>{
    try{
        const {title,description,salary,location}=req.body;
        const user=await User.findOne({email:req.user.email});
        const newJob=await new Job ({title,description,salary,location,userId:user.user_id,}).save();
        return res.status(200).json({message:"Job created successfully",id: newJob_id})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"server error"})
    

    }
});