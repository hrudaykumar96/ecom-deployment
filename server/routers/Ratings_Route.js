const express = require('express');
const router = express.Router();
const verify_token = require('../utils/authentication');
const Ratings = require('../models/Ratings');
const Orders = require('../models/Orders');

router.get('/get/ratings/:id', verify_token, async(req, res)=>{
    try {
        const id = req.params.id;
        const ratings = await Ratings.find({product:id}).sort({createdAt:-1}).populate('reviews.user');
        const total_number = ratings.length;
        const allReviews = ratings.flatMap(rating => rating.reviews);
        const totalRating = allReviews.reduce((sum, review) => {
            return sum + review.rating;
        }, 0);
        const average_rating = total_number > 0 ? totalRating / total_number : 0;
        res.json({
            success: ratings,
            average: average_rating
        })
    } catch (error) {
        res.json({
            error: 'internal server error'
        })
    }
});



/* post ratings */
router.post('/post/ratings/:id', verify_token, async (req, res) => {
    try {
        const id = req.params.id;  // Product ID
        const user = req.user;  // Logged-in user
        const { rating, reviewText } = req.body;  // Review details

        // Find all orders by the user that contain the product
        const orders = await Orders.find({ user: user._id, 'items.product': id });

        // Check if there is an order where the review hasn't been submitted
        let orderReviewed = false;
        for (let order of orders) {
            // Check if reviewSubmitted is false for any order
            if (!order.reviewSubmitted) {
                orderReviewed = true;
                break;
            }
        }

        if (!orderReviewed) {
            return res.json({
                error: 'You have already submitted reviews for all your orders of this product.'
            });
        }

        // Check if the user has already submitted a review for this product in this order
        const orderIds = orders.map(item => item._id);  // Array of order IDs
        const ratingExist = await Ratings.findOne({
            product: id,
            'reviews.user': user._id,
            'reviews.order': { $in: orderIds }  // Check if user has reviewed for any of the orders
        });

        if (ratingExist) {
            return res.json({
                error: 'You have already submitted a review for this product in one of your orders.'
            });
        }

        // Create the product rating object
        const productRating = {
            user: user._id,
            rating,
            review: reviewText,
            order: orderIds[0]  // Link the review to the first order (or modify based on your requirements)
        };

        // Check if the Ratings document already exists
        let ratingDoc = await Ratings.findOne({ product: id });

        if (!ratingDoc) {
            // If no Ratings document exists for the product, create a new one
            ratingDoc = new Ratings({
                product: id,
                reviews: [productRating]
            });
        } else {
            // If the Ratings document exists, push the new review into the reviews array
            ratingDoc.reviews.push(productRating);
        }

        // Save the Ratings document
        await ratingDoc.save();

        // Mark the review as submitted for the order (change reviewSubmitted to true for this order)
        await Orders.updateOne(
            { _id: orderIds[0] },  // Assuming we review for the first order, adjust based on your logic
            { $set: { 'reviewSubmitted': true } }
        );

        // Respond with a success message
        res.json({
            success: 'Thanks for your review!'
        });

    } catch (error) {
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});


module.exports = router;