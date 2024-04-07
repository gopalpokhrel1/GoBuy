const {Order} = require("../models/OrderModel");
const { orderMail } = require("../utils/orderMail");
const { orderStatus } = require("../utils/orderStatusMail");


exports.fetchOrder = async(req,res)=>{
    const {user} = req.query;

    const {_page, _limit} = req.query;
    if(user){
           
    try{
        const data = await Order.find({user:user})
        res.status(200).json(data)
    }

    catch(error){

    }

    }

    if(_page&&_limit){
        const pageSize = _limit;
        const page = _page;
        const data = await Order.find().skip(pageSize*(page-1)).limit(pageSize)
        res.status(200).json(data);


    }


}

exports.createOrder = async(req,res)=>{
    const data = req.body;
  
    try{
        const data = await new Order(req.body);
        data.save().then(doc=> res.status(200).json(doc)).catch(err => res.status(500))
        orderMail(data);     
    }
    catch(error){

    }
}

exports.updateOrder = async(req,res)=>{
    const file = req.body;
    const {id} = req.params;
    const data = await Order.findByIdAndUpdate(id, req.body);
  
    res.status(200).json(data);
    orderStatus(file);
}

exports.deleteOrder = async(req,res)=>{
    const {id} = req.params;

    const data = await Order.findByIdAndDelete(id);
    res.status(200).json(data);
}