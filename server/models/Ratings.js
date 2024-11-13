const mongoose = require('mongoose');
const ratingschema = new mongoose.Schema({
    product:{
        type: mongoose.Types.ObjectId,
        ref:'Products',
        required: true
    },
    reviews:[
        {
            user:{
                type: mongoose.Types.ObjectId,
                ref:'Users',
                required: true
            },
            rating:{
                type: Number,
                required: true,
            },
            review:{
                type: String,
                required: true
            },
            order:{
                type: mongoose.Types.ObjectId,
                ref:'Orders',
                required: true
            }
        }
    ]

},{timestamps: true});

module.exports = mongoose.model('Ratings', ratingschema);