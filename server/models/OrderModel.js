const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const orderSchema = new Schema({
    data:{type:[Schema.Types.Mixed]},
    totalPrice:{type:Number},
    totalQuantity:{type:Number},
    user:{type:String},
    payment:{type:String},
    status:{type:String, default:"pending"},
    selectedAddress:{type:Schema.Types.Mixed}


    })
    
    const virtual = orderSchema.virtual('id');
    virtual.get(function(){
        return this._id;
    })
    
    orderSchema.set('toJSON', {
        virtuals:true,
        versionKey:false,
        transform: function(doc,ret) { delete ret._id}
    
    })
    
    exports.Order = mongoose.model('orders', orderSchema) || mongoose.models.orders;