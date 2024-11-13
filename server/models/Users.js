const mongoose  = require('mongoose');

const userschema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    mobile:{
        type: String,
        unique: true,
        required: true
    },
    address:{
        type: String,
    },
    role:{
        type: String,
        default:'user'
    },
    password:{
        type: String,
        required: true
    },
    status:{
        type: String,
        default:'inactive'
    }
},{timestamps: true});

module.exports = mongoose.model('Users', userschema);