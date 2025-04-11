import User from '../models/User.js'

export const createUser = async(req,res)=>{
    const newUser =new User(req.body)

    try{
        const savedUser=await newUser.save()
        res.status(200).json({
        success:true,
        message:'sucessfully created',
        data:savedUser});
    }catch(err){
        res.status(500).json({success:false,message:'Failed to create',data:savedUser})
    }
} 

//update User
export const updateUser =async(req,res)=>{
    const id=req.params.id
    try{
        const updatedUser =await User.findByIdAndUpdate(id, {
            $set :req.body
        }, {new:true})

        res.status(200).json({
            success:true,
            message:'sucessfully Updated',
            data:updateUser,
        });
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:'Failed To Updated',
            data:savedUser});
    }
}
export const deleteUser =async(req,res)=>{
    try{
        const id=req.params.id
        try{
            await User.findByIdAndDelete(id);
    
            res.status(200).json({
                success:true,
                message:'sucessfully deleted',
                data:updateUser,
            });
        }
        catch(err){
            res.status(500).json({
                success:false,
                message:'Failed To delete',
                data:savedUser});
        }
    }
    catch(err){
        
    }
}
export const getSingleUser =async(req,res)=>{
    try{
        const id=req.params.id
        try{
            const user=await User.findById(id);
    
            res.status(200).json({
                success:true,
                message:'sucessfully Fetched',
                data:user
            });
        }
        catch(err){
            res.status(404).json({
                success:false,
                message:'Not found',
                data:savedUser});
        }
    }
    catch(err){
        
    }
}
export const getAllUser =async(req,res)=>{

   
    try{
        const users= await User.find({})

        res.status(200).json({
            success:true,
            message:'sucessfully',
            data:users
        });
    }
    catch(err){
        res.status(404).json({
            success:false,
            message:'Not found'
            });
    }
}
