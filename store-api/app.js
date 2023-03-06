const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
// alternative of asyncWrapper which handle async errors itself we just need to throw new Error() instead of next(error) this time
require('express-async-errors');
const productsRouter = require('./routes/routes');
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.json());

// routes
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

app.use('/api/v1/products', productsRouter);

// products route
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        // connectDB
        await mongoose.connect(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Server is listening port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};

start();
