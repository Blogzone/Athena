const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const mongoURL = require('./util/config');

const User = require('./models/user'); 

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const blogRoutes = require('./routes/blog');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('60034e91d04ad712f0dade69')
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => console.log(err));

});


app.use(blogRoutes);


mongoose.connect(mongoURL, { useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false})
.then(result => {
    console.log('CONNECTED!');

    User.findOne().then(user => {
        if(!user) {
            const user = new User({
                name: 'Swaroop',
                email: 'swaroop@test.com',
                myblogs: {
                    blogs: []
                }        
            });
            user.save();

        }
    });
    
    app.listen(3000);    

}).catch(err => {
    console.log(err);
});


