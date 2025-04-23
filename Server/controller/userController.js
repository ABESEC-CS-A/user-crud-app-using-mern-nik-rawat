const User=require("../model/userModel");
const getUsers=async(req,res)=>{
    try{
     const users=await User.find();
     res.status(200).json(users);
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}
const getUser=async(req,res)=>{
    try{
        const email=req.params.email;
     const user=await User.find({email});
     res.status(200).json(user);
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}
const createUser=async(req,res)=>{
    try{
        const {name,email,password,role}=req.body;
        const newUser=new User({name,email,password,role});
        const user=await newUser.save();
        res.status(201).json(user);
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}
const editUser=async(req,res)=>{
    try{
        const email=req.params.email;
        const {name,password,role}=req.body;
    
     const updateduser=await User.findOneAndUpdate({email},{name,password,role},{new:true});
     res.status(200).json(updateduser);
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}
const deleteUser=async(req,res)=>{
    try{
        const email=req.params.email;
     const deleteduser=await User.deleteOne({email});
     res.status(200).json(deleteduser);
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}
module.exports={getUsers,getUser,createUser,editUser,deleteUser}