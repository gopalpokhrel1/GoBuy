const {Cart} = require('../models/CartModel')

exports.createCarts = (req,res)=>{
    try{

        if(req.body === null){
          return res.status(400).json({message:"please provide data for cart"});
        }

        const data = new Cart(req.body);
        data.save().then(docs => res.status(200).json(docs)).catch(err => res.status(404).json({success:false}));

    }catch(error){
          
     return res.status(500).json({message:"Internal server error"});
    }
}

exports.getSpecificCart = async(req,res)=>{
try{
    
    const id = req.query.user
    if(!id){
        return res.status(400).json({message:"id is not provided"});
    }

    const data = await Cart.find({user:id}).populate('user').populate('product');
    res.status(200).json(data)
}
catch(error){
          
    return res.status(500).json({message:"Internal server error"});
   }
}

exports.updateCart = async (req,res) => {
   try{
    const {id} = req.params;
    if(!id){
        return res.status(400).json({message:"id is not provided"});
    }
    const data = await Cart.findByIdAndUpdate(id, req.body, {new:true}).populate('user').populate('product');
    res.status(200).json(data);
   }
   catch(error){
    return res.status(500).json({message:"Internal server error"});
   }
}

exports.deleteItem = async(req,res)=>{
try{
    const {id} = req.params;
    if(!id){
        return res.status(400).json({message:"id is not provided"});
    }
    const data = await Cart.findByIdAndDelete(id);
    res.status(200).json(data);
}
catch(error){
    return res.status(500).json({message:"Internal server error"});
}
}