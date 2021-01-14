const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const blogRoutes = require('./routes/blog');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(blogRoutes);


mongoose.connect('mongodb+srv://abhishek:QTJ81lgkraQ5emOR@cluster0.9z86w.mongodb.net/athena?retryWrites=true&w=majority', { useNewUrlParser: true , useUnifiedTopology: true})
.then(result => {
    console.log('CONNECTED!');
    app.listen(3000);
    

}).catch(err => {
    console.log(err);
});


