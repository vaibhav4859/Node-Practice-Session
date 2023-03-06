require('dotenv').config();

const mongoose = require('mongoose');
const Product = require('./models/Schema');

const jsonProducts = require('./products.json');

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await Product.deleteMany();
        await Product.create(jsonProducts);
        console.log('Success!!!!');
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

start();
