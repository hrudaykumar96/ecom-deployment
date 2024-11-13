const mongoose = require('mongoose');
const cartschema = new mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref:'Users',
        required: true
    },
    products:[
        {
        product:{
            type: mongoose.Types.ObjectId,
            ref: 'Products',
            required: true,
        },

        quantity:{
            type: Number,
            required: true,
        },
        size:{
            type: String,
            required: true,
        },
    },
    ],
    price:{
        type: Number,
        default:0
    },
    delivery_charges:{
        type: Number,
        default:0
    },
    total_price:{
        type: Number,
        default:0
    },
    checkOut:{
        type: Boolean,
        default: false
    },

},{timestamps: true});

module.exports = mongoose.model('Cart', cartschema);