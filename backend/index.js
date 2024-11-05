const express =require("express");
const app=express();
const env=require("dotenv")
const PORT=process.env.PORT ||3000;

app.get("/",(req,res)=>{
    res.send("Hello backend")
});

app.listen(PORT,()=>{
    console.log("Server is running on Port 3000")
})

// env variable
