// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const userroutes = require('./routers/Users_Router');
const productroutes = require('./routers/Product_Router');
const ratingroutes = require('./routers/Ratings_Route');
const cartroutes = require('./routers/Cart_Router');
const orderroute = require('./routers/Orders_Route');
const notificationroute = require('./routers/Notification_Router');
const ratingsroute = require('./routers/Cart_Router');

// Load environment variables from .env file
dotenv.config();


// Create an instance of the Express app
const app = express();


/* middlewares */
app.use(cors({
    origin: 'https://ecom-deployment-o1ub.onrender.com',
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/users', userroutes);
app.use('/products',productroutes);
app.use('/ratings',ratingroutes);
app.use('/cart', cartroutes);
app.use('/orders', orderroute);
app.use('/notifications', notificationroute);
app.use('/ratings', ratingroutes);


// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Database connected successfully'))
    .catch((error) => console.log(error));



// Start the server on port 3000
app.listen(3000, () => {
    try {
        console.log('Server started successfully on port 3000');
    } catch (error) {
        console.log(error);
    }
});