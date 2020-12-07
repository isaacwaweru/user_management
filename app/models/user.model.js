const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const UserSchema = mongoose.Schema({
    firstname: { type:String},
    lastname: { type: String},
    email: {type:String, required:true, unique:true},
    hobbies:   {type:[String]},
    evaluated:{type:Boolean,default:false },

    contact: {type:String, required:true, unique:true}
}, {
    timestamps: true
});
UserSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', UserSchema);
