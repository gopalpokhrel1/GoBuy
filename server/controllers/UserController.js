const { User } = require("../models/UserModel");


exports.getSpecificUser = async(req,res)=>{
    try{
        const {id} = req.params;
        const data = await User.findById(id);
        res.status(200).json(data);
    }
    catch(error){
        res.status(404).json({message:"Not Found"})
    }
}


exports.updateUser = async(req,res)=>{
    try{
        const {id} = req.params;
        
        const data = await User.findByIdAndUpdate(id, req.body);
        if(!data){
            return res.status(404).json({message:"notfound"})
        }
        res.status(200).json(data);
    }
    catch(error){
        res.status(500).json({message:'Not found'})
    }
    
}
