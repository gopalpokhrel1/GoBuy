const { Order } = require("../models/OrderModel");
const { orderMail } = require("../utils/orderMail");
const { orderStatus } = require("../utils/orderStatusMail");
const { createSignature } = require('../services/esewa');


exports.fetchOrder = async (req, res) => {
    const { user } = req.query;

    const { _page, _limit } = req.query;
    if (user) {
        try {
            const data = await Order.find({ user: user })
            res.status(200).json(data)
        }

        catch (error) {

        }

    }

    if (_page && _limit) {
        const pageSize = _limit;
        const page = _page;
        const data = await Order.find().skip(pageSize * (page - 1)).limit(pageSize)
        res.status(200).json(data);


    }


}

exports.createOrder = async (req, res) => {
    const data = req.body;


    try {
        const data = await new Order(req.body);
        data.save().then(doc => res.status(200).json(doc)).catch(err => res.status(500))
        orderMail(data);


    }
    catch (error) {

    }
}
exports.ePayment = async (req, res) => {

    try {
        const data = await Order.create(req.body);


          const signature = await createSignature(
            `total_amount = ${data.totalPrice},  transaction_uuid=${data.id}, product_code=Epaytest`

         )

         const formdata = {
            "amount": data.totalPrice,
            "failure_url": "https://google.com",
            "product_delivery_charge": "0",
            "product_service_charge": "0",
            "product_code": "EPAYTEST",
            "signature":signature ,
            "signed_field_names": "total_amount,transaction_uuid,product_code",
            "success_url": "https://esewa.com.np",
            "tax_amount": "0",
            "total_amount": data.totalPrice,
            "transaction_uuid": data.id
         } 

         console.log(formdata);
         res.status(200).json(formdata);
         
    }
    catch (error) {

    }
}

exports.updateOrder = async (req, res) => {
    const file = req.body;
    const { id } = req.params;
    const data = await Order.findByIdAndUpdate(id, req.body);

    res.status(200).json(data);
    orderStatus(file);
}

exports.deleteOrder = async (req, res) => {
    const { id } = req.params;

    const data = await Order.findByIdAndDelete(id);
    res.status(200).json(data);
}