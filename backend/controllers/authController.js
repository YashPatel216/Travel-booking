import User from "../models/User.js"
import bycrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

//user registration
export const register =async(req,res)=>{
    try{

        //hashing password
        const salt = bcrypt.genSaltSync(10);
        const hash=bycrypt.hashSync(req.body.password,salt);

        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hash,
            photo:req.body.photo    
        }) 

        await newUser.save()

        res.status(200).json({success:true,message:"sucessfully created"})
    }
    catch(err){
        res.status(200).json({success:false,message:"Failed to create User"})
    }
}
//user login
export const login =async(req,res)=>{
    try{

    }
    catch(err){

    }
}