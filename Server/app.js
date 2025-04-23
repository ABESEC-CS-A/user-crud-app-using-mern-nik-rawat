const express=require("express");
const dotenv=require("dotenv");
const connectDB=require("./config/db")
const userroutes=require("./Routes/userRoute")
dotenv.config();
const app=express();
const Port=process.env.PORT || 3000;
connectDB();
app.use(express.json());
app.use("/",userroutes);
app.listen(Port,()=>{
    console.log(`Server is running on port ${Port}`)
})