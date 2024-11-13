const express = require('express');
const router = express.Router();
const verify_token = require('../utils/authentication');
const Cart = require('../models/Cart');
const Orders = require('../models/Orders');
const Products = require('../models/Products');

router.post('/checkout', verify_token, async (req, res) => {
    try {
      const user = req.user;
      const cart = await Cart.findOne({ user: user._id }); 
      if (!cart || cart.products.length === 0) {
        return res.json({ error: 'Your cart is empty!' });
      }
      const orderItems = [];
      for (let item of cart.products) {
        const product = await Products.findById(item.product);  
        if (!product) {
          return res.json({ error: 'Product not found!' });
        }
        orderItems.push({
          product: product._id,
          size: item.size,
          quantity: item.quantity,
          price: product.price,
          total_price: product.price * item.quantity,
        });
      }
      const newOrder = new Orders({
        user: user._id,
        items: orderItems,
        price: cart.price,  
        delivery_charges: cart.delivery_charges, 
        total_price: cart.total_price, 
      });
      await newOrder.save();
      await Cart.findByIdAndDelete(cart._id);
      res.json({ success: 'Order placed successfully' });
    } catch (error) {
      res.json({ error: 'Internal server error' });
    }
  });

  /* get orders data */
  router.get('/get/orders', verify_token, async(req,res)=>{
    try {
      const user = req.user;
      const orders = await Orders.find({user:user._id}).populate('items.product');
      res.json({
        success: orders
      })
    } catch (error) {
      res.json({ error: 'Internal server error' });
    }
  })


module.exports = router;