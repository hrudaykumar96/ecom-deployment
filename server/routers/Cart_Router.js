const express = require('express');
const router = express.Router();
const verify_token = require('../utils/authentication');
const Cart = require('../models/Cart');
const Products = require('../models/Products');


/* show cart items */
router.get('/get/cart/items', verify_token, async(req,res)=>{
    try {
        const user = req.user;
        const cart_items = await Cart.find({user:user._id}).populate('products.product');
        res.json({
            success: cart_items
        })
    } catch (error) {
        res.json({ error: 'Internal server error' });
    }
});


/* add items to cart */
router.post('/add/cart/items', verify_token, async (req, res) => {
    try {
      const current_user = req.user; 
      const cart = await Cart.findOne({ user: current_user._id });
      const producttoadd = await Products.findById(req.body[0].product);
  
      if (cart) {
        req.body.forEach(item => {
          const existingProduct = cart.products.find(
            p => p.product.toString() === item.product && p.size === item.size
          );
          if (existingProduct) {
            existingProduct.quantity = parseInt(existingProduct.quantity, 10) + parseInt(item.quantity, 10);
            const price = parseFloat(producttoadd.price) * parseFloat(req.body[0].quantity);
            cart.price = parseFloat(cart.price) + parseFloat(price);
            cart.delivery_charges = parseFloat(price) < 500 ? 40 : 0;
            cart.total_price = parseFloat(cart.price) + parseFloat(cart.delivery_charges);
          } else {
            cart.products.push(item);
            const price = parseFloat(producttoadd.price) * parseFloat(req.body[0].quantity);
            cart.price = parseFloat(cart.price) + parseFloat(price);
            cart.delivery_charges = parseFloat(cart.price) < 500 ? 40 : 0;
            cart.total_price = parseFloat(cart.price) + parseFloat(cart.delivery_charges);
          }
        });
        
        await cart.save();
        return res.json({ success: 'Cart updated successfully' });
      } else {
        const price = parseFloat(producttoadd.price) * parseFloat(req.body[0].quantity);
        const delivery_charges = parseFloat(price) < 500 ? 40 : 0;
        const total_price = parseFloat(price) + parseFloat(delivery_charges);
        const newCart = new Cart({
          user: current_user._id,
          products: req.body,
          price : price,
          delivery_charges: delivery_charges,
          total_price: total_price
        });
        await newCart.save();
        res.json({ success: 'Product added successfully' });
      }
    } catch (error) {
      res.json({ error: 'Internal server error' });
    }
  });

  /* remove item from cart */
  router.delete('/delete/product/cart/:id/:quantity/:size/:price', verify_token, async(req, res)=>{
    try {
        const { id, quantity, size, price } = req.params;
        const user = req.user;
        const cart_item = await Cart.findOne({user:user._id});
        const itemtoremove = cart_item.products.findIndex(
          (item)=>item.product.toString() === id.toString() && item.quantity === parseInt(quantity) && item.size === size
        )
        cart_item.products.splice(itemtoremove,1);
        cart_item.price = parseFloat(cart_item.price) - (parseFloat(price) * parseFloat(quantity))
        cart_item.delivery_charges = parseFloat(cart_item.price) < 500 ? 40 : 0;
        cart_item.total_price = parseFloat(cart_item.price) + parseFloat(cart_item.delivery_charges);
        await cart_item.save();
        if(cart_item.products.length <=0){
          await Cart.findOneAndDelete({user:user._id})
        }
        res.json({
            success: 'product removed successfully'
        })
    } catch (error) {
        res.json({ error: 'Internal server error' });
    }
  })


module.exports = router;