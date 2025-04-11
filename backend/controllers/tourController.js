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
        const id=req.params.id
        try{
            await Tour.findByIdAndDelete(id);
    
            res.status(200).json({
                success:true,
                message:'sucessfully deleted',
                data:updateTour,
            });
        }
        catch(err){
            res.status(500).json({
                success:false,
                message:'Failed To delete',
                data:savedTour});
        }
    }
    catch(err){
        
    }
}
export const getSingleTour =async(req,res)=>{
    try{
        const id=req.params.id
        try{
            const tour=await Tour.findById(id).populate('reviews');
    
            res.status(200).json({
                success:true,
                message:'sucessfully Fetched',
                data:tour
            });
        }
        catch(err){
            res.status(404).json({
                success:false,
                message:'Not found',
                data:savedTour});
        }
    }
    catch(err){
        
    }
}
export const getAllTour =async(req,res)=>{

    //for pagination
    const page=parseInt(req.query.page);
    
    try{
        const tours= await Tour.find({}).populate('reviews')
        .skip(page*8)
        .limit(8)

        res.status(200).json({
            success:true,
            count:tours.length,
            message:'sucessfully',
            data:tours
        });
    }
    catch(err){
        res.status(404).json({
            success:false,
            message:'Not found'
            });
    }
}


export const getTourBySearch =async(req,res) =>{
    const city=new RegExp(req.query.city, 'i')
    const distance=parseInt(req.query.distance)
    const maxGroupSize =parseInt(req.query.maxGroupSize)
    try{
        const tours =await Tour.find({
        city,distance:{$gte:distance},
        maxGroupSize:{$gte:maxGroupSize},

    }).populate('reviews');
        res.status(200).json({
            success:true,
            message:'sucessfully',
            data:tours
        });
    }
    catch(err){
        res.status(404).json({
            success:false,
            message:'Not found'
            });
    }
}



//get featured tours
export const getFeaturedTour =async(req,res)=>{
    
    try{
        const tours= await Tour.find({featured:true}).populate('reviews').limit(8)

        res.status(200).json({
            success:true,
            message:'sucessfully',
            data:tours
        });
    }
    catch(err){
        res.status(404).json({
            success:false,
            message:'Not found'
            });
    }
}

//get tour count
export const getTourCount =async(req,res)=>{
    try{
        const tourCount=await Tour.estimatedDocumentCount()
        res.status(200).json({success:true, data:tourCount})
        }
    catch(err){
        res.status(500).json({success:false ,message:'failed to fetch'})
    }
}