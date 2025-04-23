const mongoose =require("mongoose");
const dotenv=require("dotenv");
dotenv.config();
const url=process.env.ATLAS_URL;

const connectDB=async()=>{
    try{
        await mongoose.connect(url);
        console.log("MONGODB Connected")
    }
    catch(err){
        console.log("DB Error ",err.message)
    }
}

module.exports=connectDB;