const express =require("express");
const app=express();
const env=require("dotenv")
const PORT=process.env.PORT ||4000;
const userRoutes=require("./routes/user")
const mongoose =require("mongoose");
env.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

 const MONGO_URL=process.env.MONGO_URL;

app.get("/",(req,res)=>{
    res.send("Hello backend")
});
app.use("/api/user",userRoutes);

app.listen(PORT,()=>{
    console.log("Server is running on Port 4000")
    mongoose.connect(MONGO_URL,{
        // useNewUrlParser:true,
        // useUnifiedTopology:'true'
    }).then(()=>{
        console.log("connected to MongoDb")
    }).catch((error)=>{
        console.log("Connection failed")
    })
})

// env variable
