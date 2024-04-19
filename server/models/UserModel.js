const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const userSchema = new Schema({
    email: {type:String, required:true, unique:true},
    password:{type:String, required:true},
    address:{type:[Schema.Types.Mixed]},
    role:{type:String , default:"user"},
    token:{type:String}
})

const virtual = userSchema.virtual('id');
virtual.get(function(){
    return this._id;
}) 


userSchema.set('toJSON', {
    virtuals:true,
    versionKey:false,
    transform: function(doc,ret) { delete ret._id}

})

exports.User = mongoose.model('users', userSchema) || mongoose.models.users