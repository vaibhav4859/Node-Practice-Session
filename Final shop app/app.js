const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require('mongoose');
const dotenv = require("dotenv");

const errorController = require("./controllers/error");
const User = require('./models/user');

dotenv.config();
app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById('65df8347bf7b56a49aa1f54e')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

// app.use(errorController.get404Page);


mongoose
  .connect(
    process.env.MONGO_URL
  )
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Vaibhav',
          email: 'vsachdeva4859@gmail.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(3000);
    console.log("Connected!");
  })
  .catch(err => {
    console.log(err);
  });
