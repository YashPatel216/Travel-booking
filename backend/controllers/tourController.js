import Tour from '../models/Tour.js'


export const createTour = async(req,res)=>{
    const newTour =new Tour(req.body)

    try{
        const savedTour=await newTour.save()
        res.status(200).json({
        success:true,
        message:'sucessfully created',
        data:savedTour});
    }catch(err){
        res.status(500).json({success:false,message:'Failed to create',data:savedTour})
    }
} 

//update tour
export const updateTour =async(req,res)=>{
    const id=req.params.id
    try{
        const updatedTour =await Tour.findByIdAndUpdate(id, {
            $set :req.body
        }, {new:true})

        res.status(200).json({
            success:true,
            message:'sucessfully Updated',
            data:updateTour,
        });
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:'Failed To Updated',
            data:savedTour});
    }
}
export const deleteTour =async(req,res)=>{
    try{

    }
    catch(err){
        
    }
}
export const getSingleTour =async(req,res)=>{
    try{

    }
    catch(err){
        
    }
}
export const getAllTour =async(req,res)=>{
    try{

    }
    catch(err){
        
    }
}