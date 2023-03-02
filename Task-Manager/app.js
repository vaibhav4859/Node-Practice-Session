const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const mongoose = require('mongoose');
const notFound = require('./middleware/notFound');
require('dotenv').config();

// middleware
app.use(express.static('./public'));
app.use(express.json());

// routes
app.use('/api/v1/tasks', tasks);
app.use(notFound);

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(process.env.MONGO_URI).then(() => console.log('Connected'));
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};  

start();

// Representational State Transfer (REST API) 