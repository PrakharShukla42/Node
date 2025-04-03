const express = require('express');
const router = express.Router();
const Product = require('../model/product');
const User = require('../model/user');

router.get('/user/cart/add/:productId',async (req,res)=>{
    const {productId} = req.params;
    const product = await Product.findById(productId);
    if(!product){
        return res.redirect('/products');
    }

    const user = await User.findById(req.user._id);  
    const cart = user.cart.find(item => item.productId.equals(productId));
    if(cart){
        cart.quantity++;
    }else{
        user.cart.push({productId,quantity:1})
    }
    await user.save();
    res.redirect('back'); 
})

module.exports = router;