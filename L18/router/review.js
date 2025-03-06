const express = require('express');
const router = express.Router();
const Product = require('../model/product');
const Review = require('../model/review');

router.post('/products/:productId/reviews', async (req, res) => {
    try {
        const { productId } = req.params;
        const { rating, comment } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const review = new Review({ rating, comment });
        product.reviews.push(review);

        await review.save();
        await product.save();

        res.redirect(`/products/${productId}`);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
