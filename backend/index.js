const express =require("express");
const app=express();
const env=require("dotenv")
const PORT=process.env.PORT ||3000;

// Databse
const mongoose =require("mongoose");


app.get("/",(req,res)=>{
    res.send("Hello backend")
});

app.listen(PORT,()=>{
    console.log("Server is running on Port 3000")
    mongoose.connect(MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:'true'
    }).then(()=>{
        console.log("connected to MongoDb")
    }).catch((error)=>{
        console.log("Connection failed")
    })
})

// env variable
env.config();
 const MONGO_URL=process.env.MONGO_URL;