const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

const User = require('./models/user');

const mongoURL = require('./util/config');


const app = express();
const store = new MongoDBStore({
    uri: mongoURL,
    collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const blogRoutes = require('./routes/blog');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'aSecretHashforsigning', resave: false, saveUninitialized: false, store: store}));
app.use(flash());

app.use((req, res, next) => {
    if(!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
    .then(user => {
        req.user = user;
        next();
    }).catch(err => {
        console.log(err);
    });
});


app.use(blogRoutes);
app.use(authRoutes);


mongoose.connect(mongoURL, { useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false})
.then(result => {
    console.log('CONNECTED!');     
    app.listen(3000);    

}).catch(err => {
    console.log(err);
});


