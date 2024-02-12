const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
// const expressHbs = require('express-handlebars');
const app = express();

const errorController = require('./controllers/error');

// app.engine('handlebars', expressHbs({ layoutsDir: 'views/layouts', defaultLayout: 'main-layout' }))

// app.set(name, value) Assigns setting name to value. You may store any value that you want, but certain names can be used to configure the behavior of the server like below.
// pug then finally compiles written code into that in normal html it is used to render dynamic html
// app.set('view engine', 'handlebars');
app.set('view engine', 'ejs');
app.set('views', 'views') // second views is to specify folder name that is same as default in my case views containg html files but if it was of diff name then i would have to specify here

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404Page);

app.listen(3000, () => {
    console.log("server is listening on port", 3000);
});
