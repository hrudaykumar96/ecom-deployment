const mongoose  = require('mongoose');

const productschema = new mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref:'Users',
        required: true
    },
    brand_name:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true,
    },
    fabric: {
        type: String,
        required: true,
    },
    sleeve: {
        type: String,
        required: true,
    },
    pattern: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    items: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
},{timestamps: true});

module.exports = mongoose.model('Products', productschema);