const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const cartSchema = new Schema({
    quantity:{type:Number, default:1},
    product:{type:Schema.Types.ObjectId, ref:"products", required:true},
    user:{type:Schema.Types.ObjectId, ref:"users", required:true}
    })
    
    const virtual = cartSchema.virtual('id');
    virtual.get(function(){
        return this._id;
    })
    
    cartSchema.set('toJSON', {
        virtuals:true,
        versionKey:false,
        transform: function(doc,ret) { delete ret._id}
    
    })
    
    exports.Cart = mongoose.model('carts', cartSchema) || mongoose.models.carts;