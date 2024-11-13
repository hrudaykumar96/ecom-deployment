const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
  user: {  
    type: mongoose.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  items: [
    {
      product: {  
        type: mongoose.Types.ObjectId,
        ref: 'Products',
        required: true,
      },
      size: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number, 
        required: true,
      },
      total_price: {
        type: Number, 
        required: true,
      },
    },
  ],
  price: { 
    type: Number, 
    required: true,
  },
  delivery_charges: {  
    type: Number,  
    required: true,
  },
  total_price: {
    type: Number, 
    required: true,
  },
  reviewSubmitted:{
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Orders', ordersSchema);