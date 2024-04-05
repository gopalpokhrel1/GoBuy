const {Cart} = require('../models/CartModel')

exports.createCarts = (req,res)=>{
    const data = new Cart(req.body);
    data.save().then(docs => res.status(200).json(docs)).catch(err => res.status(404).json({success:false}))
}

exports.getSpecificCart = async(req,res)=>{
    const id = req.query.user
     

    const data = await Cart.find({user:id}).populate('user').populate('product');
    res.status(200).json(data)

}

exports.updateCart = async (req,res) => {
    const {id} = req.params;
   
    const data = await Cart.findByIdAndUpdate(id, req.body, {new:true}).populate('user').populate('product');
    res.status(200).json(data);
}

exports.deleteItem = async(req,res)=>{
    const {id} = req.params;
    const data = await Cart.findByIdAndDelete(id);
    res.status(200).json(data);
}