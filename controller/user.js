const mongoose = require("mongoose");
const User = require('../models/user');
const bcrypt = require('bcrypt');
const createUser =async(req,res)=>{
    const {username,password,email,emailPassword} = req.body;
    if(!username || !password || !email || !emailPassword){
        return res.status(400).json({isOK:false,message:"All fields are required"});
    }

    try{
        
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await  User.create({username,email,password:hashedPassword,emailPassword});
    res.status(200).json({isOK:true,message:"User created Successfully",user:user});
    }
    catch(e){
        res.status(500).json({isOK:false,message:e.message});
    }


}

module.exports = {
    createUser
}